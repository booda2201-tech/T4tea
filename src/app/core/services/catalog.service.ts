import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { products as localProducts, teawares as localTeawares } from '../../data/products';
import { ApiProduct, ApiTeaware } from '../../models/api-catalog.model';
import { Product, Teaware } from '../../models/product.model';
import { ApiResponseHelper } from './api-response.helper';
import { ProductsApiService } from './products-api.service';
import { TeawaresApiService } from './teawares-api.service';

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
  ) {}

  get products(): Product[] {
    return this.productsSubject.value;
  }

  get teawares(): Teaware[] {
    return this.teawaresSubject.value;
  }

  ensureLoaded(): void {
    if (this.loaded || this.loading) {
      return;
    }
    this.loadCatalog();
  }

  refresh(): void {
    this.loaded = false;
    this.loadCatalog();
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getTeawareById(id: string): Teaware | undefined {
    return this.teawares.find(item => item.id === id);
  }

  getBestsellers(limit = 4): Product[] {
    return this.products.slice(0, limit);
  }

  private loadCatalog(): void {
    this.loading = true;
    this.loadingSubject.next(true);
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
          this.loadingSubject.next(false);
          this.loaded = true;
        })
      )
      .subscribe(({ mappedProducts, mappedTeawares }) => {
        const productsFromApi = !!(mappedProducts && mappedProducts.length);
        const teawaresFromApi = !!(mappedTeawares && mappedTeawares.length);

        this.productsSubject.next(productsFromApi ? mappedProducts! : [...localProducts]);
        this.teawaresSubject.next(teawaresFromApi ? mappedTeawares! : [...localTeawares]);

        if (productsFromApi || teawaresFromApi) {
          this.sourceSubject.next('api');
          this.errorSubject.next(null);
          console.info(
            `[Catalog] Loaded from API — products: ${productsFromApi ? mappedProducts!.length : 0}, teawares: ${teawaresFromApi ? mappedTeawares!.length : 0}`
          );
        } else {
          this.sourceSubject.next('local');
          this.errorSubject.next('تعذر الاتصال بالسيرفر — يتم عرض البيانات المحلية');
          console.warn('[Catalog] Falling back to local static products');
        }
      });
  }

  private mapProduct(item: ApiProduct): Product {
    const record = item as unknown as Record<string, unknown>;
    const imageUrls = this.apiHelper.extractImageUrls(record);
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const finalPrice = discount > 0 && discount < price ? Math.max(0, price - discount) : price;

    return {
      id: String(item.id ?? item.name),
      title: item.name || 'Untitled Tea',
      type: item.categoryName || 'Tea',
      price: finalPrice,
      image: imageUrls[0] || 'assets/imges/Black Tea.png',
      description: item.description || '',
      brewingGuide: item.brewingGuide || '',
      aroma: item.brewingGuide || undefined,
      tasteNotes: item.description || undefined,
    };
  }

  private mapTeaware(item: ApiTeaware): Teaware {
    const record = item as unknown as Record<string, unknown>;
    const imageUrls = this.apiHelper.extractImageUrls(record);
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const finalPrice = discount > 0 && discount < price ? Math.max(0, price - discount) : price;

    return {
      id: String(item.id ?? item.name),
      title: item.name || 'Untitled Teaware',
      type: item.teawareCategoryName || item.categoryName || 'Teaware',
      price: finalPrice,
      image: imageUrls[0] || 'assets/imges/Mask group (4).png',
      description: item.description || '',
    };
  }
}
