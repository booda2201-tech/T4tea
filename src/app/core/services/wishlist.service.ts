import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WishlistItem, WishlistProductInput } from '../../models/wishlist-item.model';
import { products, teawares } from '../../data/products';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';
import { CatalogService } from './catalog.service';

/** Legacy guest key — purged; wishlist is account-only via the API. */
const LEGACY_STORAGE_KEY = 't4tea_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.wishlist;

  wishlistItems$ = this.wishlistSubject.asObservable();
  wishlistCount$ = this.wishlistItems$.pipe(map(items => items.length));
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private hadUser = false;
  private syncInFlight: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper,
    private catalog: CatalogService,
    private router: Router
  ) {
    this.purgeLegacyStorage();

    // Re-enrich images once catalog arrives.
    this.catalog.products$.subscribe(() => {
      if (this.wishlistItems.length) {
        this.setItems(this.wishlistItems.map(item => this.enrich(item)));
      }
    });

    this.auth.user$
      .pipe(distinctUntilChanged((a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)))
      .subscribe(user => {
        if (user) {
          this.hadUser = true;
          return;
        }

        if (this.hadUser) {
          this.hadUser = false;
        }
        this.setItems([]);
        this.purgeLegacyStorage();
      });
  }

  get wishlistItems(): WishlistItem[] {
    return this.wishlistSubject.value;
  }

  get wishlistCount(): number {
    return this.wishlistItems.length;
  }

  isWishlisted(id: string): boolean {
    return this.wishlistItems.some(item => item.id === String(id));
  }

  toggle(item: WishlistProductInput): void {
    if (!this.requireLogin()) {
      return;
    }

    if (this.isWishlisted(item.id)) {
      this.removeFromWishlist(item.id);
    } else {
      this.addToWishlist(item);
    }
  }

  addToWishlist(item: WishlistProductInput): void {
    if (!this.requireLogin()) {
      return;
    }

    if (this.isWishlisted(item.id)) {
      return;
    }

    this.setItems([...this.wishlistItems, this.normalize(item)]);
    this.pushToApi(item.id);
  }

  /** POST /api/Wishlist/items/AddItem/{productId} */
  private pushToApi(id: string | number): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .post(`${this.base}${this.ep.add}/${encodeURIComponent(String(id))}`, null)
      .pipe(
        catchError(err => {
          console.error('[Wishlist] AddItem failed', err);
          return of(null);
        })
      )
      .subscribe();
  }

  removeFromWishlist(id: string): void {
    if (!this.auth.isLoggedIn()) {
      this.setItems([]);
      return;
    }

    const target = String(id);
    this.setItems(this.wishlistItems.filter(item => item.id !== target));

    this.http
      .delete(`${this.base}${this.ep.remove}/${encodeURIComponent(target)}`)
      .pipe(
        catchError(err => {
          console.error('[Wishlist] RemoveItem failed', err);
          return of(null);
        })
      )
      .subscribe();
  }

  clearLocal(): void {
    this.setItems([]);
    this.purgeLegacyStorage();
  }

  /** Force re-fetch even if a previous sync is still in flight. */
  refresh(): void {
    this.syncInFlight?.unsubscribe();
    this.syncInFlight = null;
    this.syncFromApi();
  }

  syncFromApi(): void {
    if (!this.auth.isLoggedIn()) {
      this.setItems([]);
      return;
    }

    if (this.syncInFlight) {
      return;
    }

    this.isLoadingSubject.next(true);

    this.syncInFlight = this.http
      .get<unknown>(`${this.base}${this.ep.get}`)
      .pipe(
        map(res => this.parseWishlistResponse(res)),
        catchError(err => {
          console.error('[Wishlist] GetWishlist failed', err);
          if (err?.status === 504 || err?.status === 502 || err?.status === 0) {
            return this.http.get<unknown>(`${this.base}${this.ep.get}`).pipe(
              map(res => this.parseWishlistResponse(res)),
              catchError(retryErr => {
                console.error('[Wishlist] GetWishlist retry failed', retryErr);
                return of(this.wishlistSubject.value);
              })
            );
          }
          return of(this.wishlistSubject.value);
        }),
        finalize(() => {
          this.syncInFlight = null;
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe(items => {
        this.setItems(items);
        console.info(`[Wishlist] Synced ${items.length} item(s) from API`);
      });
  }

  private parseWishlistResponse(res: unknown): WishlistItem[] {
    const list = this.extractWishlistList(res);
    return this.dedupe(
      list
        .map(raw => this.mapWishlistItem(raw as Record<string, unknown>))
        .filter(item => !!item.id)
        .map(item => this.enrich(item))
    );
  }

  private extractWishlistList(res: unknown): unknown[] {
    if (Array.isArray(res)) {
      return res;
    }

    if (!res || typeof res !== 'object') {
      return [];
    }

    const direct = this.apiHelper.asArray<unknown>(res);
    if (direct.length) {
      return direct;
    }

    const obj = res as Record<string, unknown>;
    for (const key of [
      'data',
      'Data',
      'items',
      'Items',
      'wishlist',
      'Wishlist',
      'wishlistItems',
      'WishlistItems',
      'result',
      'Result',
      'value',
      'Value',
    ]) {
      const candidate = obj[key];
      if (Array.isArray(candidate)) {
        return candidate;
      }
      if (candidate && typeof candidate === 'object') {
        const nested = this.apiHelper.asArray<unknown>(candidate);
        if (nested.length) {
          return nested;
        }
      }
    }

    return [];
  }

  private requireLogin(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: '/wishlist' } });
    return false;
  }

  private enrich(item: WishlistItem): WishlistItem {
    const missingName = !item.name || item.name === 'Item' || item.name === 'string';
    if (item.image && item.type && !missingName) {
      return item;
    }

    const apiCatalog = this.catalog.getProductById(item.id) ?? this.catalog.getTeawareById(item.id);
    const local = this.wishlistItems.find(existing => existing.id === item.id);
    const staticCatalog = [...products, ...teawares].find(entry => String(entry.id) === item.id);

    return {
      ...item,
      name: (missingName ? '' : item.name) || apiCatalog?.title || local?.name || staticCatalog?.title || 'Item',
      image: item.image || apiCatalog?.image || local?.image || staticCatalog?.image || '',
      type: item.type || apiCatalog?.type || local?.type || staticCatalog?.type || '',
      price: item.price || apiCatalog?.price || local?.price || staticCatalog?.price || 0,
    };
  }

  private mapWishlistItem(raw: Record<string, unknown>): WishlistItem {
    const product = (raw['product'] ?? raw['Product'] ?? raw['teaware'] ?? raw['Teaware']) as
      | Record<string, unknown>
      | undefined;
    const imageUrls = this.apiHelper.extractImageUrls(raw);
    const productImages = this.apiHelper.extractImageUrls(product);

    return this.normalize({
      id: String(
        raw['productId'] ??
          raw['ProductId'] ??
          raw['teawareId'] ??
          raw['TeawareId'] ??
          product?.['id'] ??
          product?.['Id'] ??
          raw['id'] ??
          raw['Id'] ??
          ''
      ),
      name: String(
        raw['name'] ??
          raw['Name'] ??
          raw['title'] ??
          raw['productName'] ??
          product?.['name'] ??
          product?.['Name'] ??
          ''
      ),
      type: String(
        raw['type'] ??
          raw['categoryName'] ??
          product?.['categoryName'] ??
          product?.['type'] ??
          ''
      ),
      price: Number(raw['price'] ?? raw['Price'] ?? product?.['price'] ?? product?.['Price'] ?? 0),
      image: imageUrls[0] || productImages[0] || String(raw['image'] ?? ''),
    });
  }

  private normalize(item: WishlistProductInput): WishlistItem {
    return {
      id: String(item.id),
      name: item.name?.trim() || 'Item',
      type: item.type || '',
      price: Number(item.price) || 0,
      image: item.image || '',
    };
  }

  private dedupe(items: WishlistItem[]): WishlistItem[] {
    const seen = new Set<string>();
    const result: WishlistItem[] = [];

    for (const item of items) {
      if (!item.id || seen.has(item.id)) {
        continue;
      }
      seen.add(item.id);
      result.push(item);
    }

    return result;
  }

  private setItems(items: WishlistItem[]): void {
    this.wishlistSubject.next(this.dedupe(items.filter(item => !!item.id)));
  }

  private purgeLegacyStorage(): void {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}
