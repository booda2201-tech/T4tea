import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { products as localProducts, teawares as localTeawares } from '../../data/products';
import { ApiProduct, ApiTeaware } from '../../models/api-catalog.model';
import { Product, Teaware } from '../../models/product.model';
import { ApiResponseHelper } from './api-response.helper';
import { ProductsApiService } from './products-api.service';
import { TeawaresApiService } from './teawares-api.service';

const CACHE_KEY = 't4tea_catalog_v2';
const CACHE_TTL_MS = 30 * 60 * 1000;

interface CatalogCache {
  products: Product[];
  teawares: Teaware[];
  savedAt: number;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  private readonly teawaresSubject = new BehaviorSubject<Teaware[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  private readonly sourceSubject = new BehaviorSubject<'api' | 'local' | 'idle'>('idle');
  private loaded = false;
  private loading = false;

  readonly products$ = this.productsSubject.asObservable();
  readonly teawares$ = this.teawaresSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();
  readonly source$ = this.sourceSubject.asObservable();

  constructor(
    private productsApi: ProductsApiService,
    private teawaresApi: TeawaresApiService,
    private apiHelper: ApiResponseHelper
  ) {
    this.hydrateFromCacheOrLocal();
  }

  get products(): Product[] {
    return this.productsSubject.value;
  }

  get teawares(): Teaware[] {
    return this.teawaresSubject.value;
  }

  ensureLoaded(): void {
    if (this.loading) {
      return;
    }

    const hasData = this.productsSubject.value.length > 0 || this.teawaresSubject.value.length > 0;
    if (this.loaded) {
      // Background refresh only — never flash loading on every page visit
      if (this.isCacheStale()) {
        this.loadCatalog(false);
      }
      return;
    }

    this.loadCatalog(!hasData);
  }

  refresh(): void {
    this.loaded = false;
    this.loadCatalog(true);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => String(product.id) === String(id));
  }

  getTeawareById(id: string): Teaware | undefined {
    return this.teawares.find(item => String(item.id) === String(id));
  }

  /** Tea and teaware IDs can collide — resolve which catalog the item belongs to. */
  resolveKind(
    id: string,
    hint?: { name?: string; type?: string; price?: number }
  ): 'tea' | 'teaware' {
    const tea = this.getProductById(id);
    const ware = this.getTeawareById(id);

    if (tea && !ware) {
      return 'tea';
    }
    if (ware && !tea) {
      return 'teaware';
    }
    if (tea && ware && hint) {
      if (hint.name && tea.title === hint.name) {
        return 'tea';
      }
      if (hint.name && ware.title === hint.name) {
        return 'teaware';
      }
      if (hint.type && tea.type === hint.type) {
        return 'tea';
      }
      if (hint.type && ware.type === hint.type) {
        return 'teaware';
      }
      if (hint.price != null && tea.price === hint.price && ware.price !== hint.price) {
        return 'tea';
      }
      if (hint.price != null && ware.price === hint.price && tea.price !== hint.price) {
        return 'teaware';
      }
    }

    return tea ? 'tea' : 'teaware';
  }

  getBestsellers(limit = 4): Product[] {
    return this.products.slice(0, limit);
  }

  private hydrateFromCacheOrLocal(): void {
    const cached = this.readCache();
    if (cached) {
      this.productsSubject.next(cached.products);
      this.teawaresSubject.next(cached.teawares);
      this.sourceSubject.next('api');
      this.loaded = !this.isCacheStale(cached.savedAt);
      return;
    }

    this.productsSubject.next([...localProducts]);
    this.teawaresSubject.next([...localTeawares]);
    this.sourceSubject.next('local');
  }

  private loadCatalog(showLoading = true): void {
    this.loading = true;
    if (showLoading) {
      this.loadingSubject.next(true);
    }
    this.errorSubject.next(null);

    forkJoin({
      products: this.productsApi.getAll().pipe(
        catchError(err => {
          console.error('[Catalog] Products API failed', err);
          return of(null);
        })
      ),
      teawares: this.teawaresApi.getAll().pipe(
        catchError(err => {
          console.error('[Catalog] Teawares API failed', err);
          return of(null);
        })
      ),
    })
      .pipe(
        map(({ products, teawares }) => {
          const mappedProducts =
            products == null
              ? null
              : this.apiHelper.asArray<ApiProduct>(products).map(item => this.mapProduct(item));

          const mappedTeawares =
            teawares == null
              ? null
              : this.apiHelper.asArray<ApiTeaware>(teawares).map(item => this.mapTeaware(item));

          return { mappedProducts, mappedTeawares };
        }),
        finalize(() => {
          this.loading = false;
          if (showLoading) {
            this.loadingSubject.next(false);
          }
          this.loaded = true;
        })
      )
      .subscribe(({ mappedProducts, mappedTeawares }) => {
        const productsFromApi = !!(mappedProducts && mappedProducts.length);
        const teawaresFromApi = !!(mappedTeawares && mappedTeawares.length);

        if (productsFromApi || teawaresFromApi) {
          const nextProducts = productsFromApi ? mappedProducts! : this.productsSubject.value;
          const nextTeawares = teawaresFromApi ? mappedTeawares! : this.teawaresSubject.value;

          this.productsSubject.next(nextProducts.length ? nextProducts : [...localProducts]);
          this.teawaresSubject.next(nextTeawares.length ? nextTeawares : [...localTeawares]);
          this.sourceSubject.next('api');
          this.errorSubject.next(null);
          this.writeCache(this.productsSubject.value, this.teawaresSubject.value);
          console.info(
            `[Catalog] Loaded from API — products: ${productsFromApi ? mappedProducts!.length : 0}, teawares: ${teawaresFromApi ? mappedTeawares!.length : 0}`
          );
          return;
        }

        if (!this.productsSubject.value.length && !this.teawaresSubject.value.length) {
          this.productsSubject.next([...localProducts]);
          this.teawaresSubject.next([...localTeawares]);
        }
        this.sourceSubject.next('local');
        this.errorSubject.next('تعذر الاتصال بالسيرفر — يتم عرض البيانات المحلية');
        console.warn('[Catalog] Falling back to local static products');
      });
  }

  private readCache(): CatalogCache | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as CatalogCache;
      if (!Array.isArray(parsed.products) || !Array.isArray(parsed.teawares)) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  private writeCache(products: Product[], teawares: Teaware[]): void {
    try {
      const payload: CatalogCache = {
        products,
        teawares,
        savedAt: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota / private-mode errors
    }
  }

  private isCacheStale(savedAt = this.readCache()?.savedAt): boolean {
    if (!savedAt) {
      return true;
    }

    return Date.now() - savedAt > CACHE_TTL_MS;
  }

  private mapProduct(item: ApiProduct): Product {
    const record = item as unknown as Record<string, unknown>;
    // Postman: imageUrls is string[] — keep every URL for the product gallery.
    const fromUrls = Array.isArray(item.imageUrls)
      ? item.imageUrls.map(url => this.apiHelper.normalizeImageUrl(url)).filter((url): url is string => !!url)
      : [];
    const imageUrls = fromUrls.length ? [...new Set(fromUrls)] : this.apiHelper.extractImageUrls(record);
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const finalPrice = discount > 0 && discount < price ? Math.max(0, price - discount) : price;

    return {
      id: String(item.id ?? item.name),
      title: item.name || 'Untitled Tea',
      type: item.categoryName || 'Tea',
      price: finalPrice,
      image: imageUrls[0] || 'assets/imges/Black Tea.png',
      images: imageUrls.length ? imageUrls : ['assets/imges/Black Tea.png'],
      description: item.description || '',
      brewingGuide: item.brewingGuide || '',
      aroma: item.brewingGuide || undefined,
      tasteNotes: item.description || undefined,
    };
  }

  private mapTeaware(item: ApiTeaware): Teaware {
    const record = item as unknown as Record<string, unknown>;
    const fromUrls = Array.isArray(item.imageUrls)
      ? item.imageUrls.map(url => this.apiHelper.normalizeImageUrl(url)).filter((url): url is string => !!url)
      : [];
    const imageUrls = fromUrls.length ? [...new Set(fromUrls)] : this.apiHelper.extractImageUrls(record);
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const finalPrice = discount > 0 && discount < price ? Math.max(0, price - discount) : price;

    return {
      id: String(item.id ?? item.name),
      title: item.name || 'Untitled Teaware',
      type: item.teawareCategoryName || item.categoryName || 'Teaware',
      price: finalPrice,
      image: imageUrls[0] || 'assets/imges/Mask group (4).png',
      images: imageUrls.length ? imageUrls : ['assets/imges/Mask group (4).png'],
      description: item.description || '',
    };
  }
}
