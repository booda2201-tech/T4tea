import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WishlistItem, WishlistProductInput } from '../../models/wishlist-item.model';
import { products, teawares } from '../../data/products';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';
import { CatalogService } from './catalog.service';

const STORAGE_KEY = 't4tea_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.wishlist;

  wishlistItems$ = this.wishlistSubject.asObservable();
  wishlistCount$ = this.wishlistItems$.pipe(map(items => items.length));

  private hadUser = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper,
    private catalog: CatalogService
  ) {
    // localStorage only backs the guest wishlist; a signed-in user's
    // wishlist lives on the server and is fetched on login / app start.
    if (!this.auth.isLoggedIn()) {
      this.wishlistSubject.next(this.readStoredWishlist());
    }

    // Items synced before the catalog finished loading may miss images —
    // re-enrich them once the API catalog is available.
    this.catalog.ensureLoaded();
    this.catalog.products$.subscribe(() => {
      if (this.wishlistItems.length) {
        this.persist(this.wishlistItems.map(item => this.enrich(item)));
      }
    });

    // distinctUntilChanged: silent re-logins re-emit the same user;
    // syncing again on each one caused an infinite 401 → relogin → sync loop
    this.auth.user$
      .pipe(distinctUntilChanged((a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)))
      .subscribe(user => {
        if (user) {
          this.hadUser = true;
          this.syncFromApi();
        } else if (this.hadUser) {
          // Signed out → the account's wishlist must not leak to the next visitor
          this.hadUser = false;
          this.clearLocal();
        }
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
    if (this.isWishlisted(item.id)) {
      this.removeFromWishlist(item.id);
    } else {
      this.addToWishlist(item);
    }
  }

  addToWishlist(item: WishlistProductInput): void {
    if (this.isWishlisted(item.id)) {
      return;
    }

    this.persist([...this.wishlistItems, this.normalize(item)]);
    this.pushToApi(item.id);
  }

  /** POST /api/Wishlist/items/AddItem/{productId} — productId is a path variable */
  private pushToApi(id: string | number): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .post(`${this.base}${this.ep.add}/${encodeURIComponent(String(id))}`, null)
      .pipe(catchError(err => {
        console.error('[Wishlist] AddItem failed', err);
        return of(null);
      }))
      .subscribe();
  }

  removeFromWishlist(id: string): void {
    const target = String(id);
    this.persist(this.wishlistItems.filter(item => item.id !== target));

    if (this.auth.isLoggedIn()) {
      this.http
        .delete(`${this.base}${this.ep.remove}/${encodeURIComponent(target)}`)
        .pipe(catchError(err => {
          console.error('[Wishlist] RemoveItem failed', err);
          return of(null);
        }))
        .subscribe();
    }
  }

  clearLocal(): void {
    this.persist([]);
  }

  syncFromApi(): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .get(`${this.base}${this.ep.get}`)
      .pipe(catchError(err => {
        console.error('[Wishlist] GetWishlist failed', err);
        return of(null);
      }))
      .subscribe(res => {
        if (res == null) {
          return;
        }

        const serverItems = this.apiHelper
          .asArray<Record<string, unknown>>(res)
          .map(raw => this.mapWishlistItem(raw))
          .filter(item => !!item.id)
          .map(item => this.enrich(item));

        // Items hearted before signing in live only locally — push them
        // to the account so they survive the next logout/login
        const serverIds = new Set(serverItems.map(item => item.id));
        const localOnly = this.wishlistItems.filter(item => !serverIds.has(item.id));
        for (const item of localOnly) {
          this.pushToApi(item.id);
        }

        this.persist(this.dedupe([...serverItems, ...localOnly]));
        console.info(`[Wishlist] Synced ${serverItems.length} item(s) from API`);
      });
  }

  /**
   * الـ API مش بيرجع صور/تفاصيل كاملة — كمّل الناقص من كتالوج السيرفر الأول
   * (نفس الـ IDs)، وبعدين النسخة المحلية الحالية، وآخر حل الكتالوج الثابت.
   */
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
    const imageUrls = this.apiHelper.extractImageUrls(raw);
    return this.normalize({
      id: String(raw['productId'] ?? raw['teawareId'] ?? raw['id'] ?? raw['Id'] ?? ''),
      name: String(raw['name'] ?? raw['Name'] ?? raw['title'] ?? ''),
      type: String(raw['type'] ?? raw['categoryName'] ?? ''),
      price: Number(raw['price'] ?? raw['Price'] ?? 0),
      image: imageUrls[0] || String(raw['image'] ?? ''),
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

  /**
   * Signed-in users: state lives in memory + on the server (no localStorage).
   * Guests: state is persisted locally so the wishlist survives a refresh.
   */
  private persist(items: WishlistItem[]): void {
    const clean = this.dedupe(items.filter(item => !!item.id));
    this.wishlistSubject.next(clean);

    if (this.auth.isLoggedIn()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    }
  }

  private readStoredWishlist(): WishlistItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as WishlistItem[];
      return this.dedupe(
        (Array.isArray(parsed) ? parsed : [])
          .map(item => this.normalize(item))
          .filter(item => !!item.id && !!item.name)
      );
    } catch {
      return [];
    }
  }
}
