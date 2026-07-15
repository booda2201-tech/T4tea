import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem, CartProductInput } from '../../models/cart-item.model';
import { products, teawares } from '../../data/products';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';
import { CatalogService } from './catalog.service';

const STORAGE_KEY = 't4tea_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);

  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.cart;

  cartItems$ = this.cartItemsSubject.asObservable();
  isCartOpen$ = this.isCartOpenSubject.asObservable();
  cartTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.price * item.quantity, 0))
  );
  cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  private hadUser = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper,
    private catalog: CatalogService
  ) {
    // localStorage only backs the guest cart; a signed-in user's cart
    // lives on the server and is fetched on login / app start.
    if (!this.auth.isLoggedIn()) {
      this.cartItemsSubject.next(this.readStoredCart());
    }

    // Items synced before the catalog finished loading may miss images —
    // re-enrich them once the API catalog is available.
    this.catalog.ensureLoaded();
    this.catalog.products$.subscribe(() => {
      if (this.cartItemsSubject.value.length) {
        this.cartItemsSubject.next(this.cartItemsSubject.value.map(item => this.enrich(item)));
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
          // Signed out → drop the account's cart locally (server copy stays)
          this.hadUser = false;
          this.cartItemsSubject.next([]);
          localStorage.removeItem(STORAGE_KEY);
          this.isCartOpenSubject.next(false);
        }
      });
  }

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  get isCartOpen(): boolean {
    return this.isCartOpenSubject.value;
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get cartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  addToCart(item: CartProductInput, quantity = 1): void {
    const current = this.cartItemsSubject.value;
    const existing = current.find(i => i.id === item.id);
    let next: CartItem[];

    if (existing) {
      next = current.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      next = [...current, { ...item, quantity }];
    }

    this.setItems(next);
    this.isCartOpenSubject.next(true);
    this.pushAddToApi(item, quantity);
  }

  /** POST /api/Cart/items/AddToCart — body: { productId, quantity } */
  private pushAddToApi(item: CartProductInput, quantity: number): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .post(`${this.base}${this.ep.add}`, {
        productId: Number(item.id) || item.id,
        quantity,
      })
      .pipe(catchError(err => {
        console.error('[Cart] AddToCart failed', err);
        return of(null);
      }))
      .subscribe();
  }

  /** DELETE /api/Cart/items/RemoveItem/{productId} — productId is a path variable */
  private pushRemoveToApi(id: string): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .delete(`${this.base}${this.ep.remove}/${encodeURIComponent(String(id))}`)
      .pipe(catchError(err => {
        console.error('[Cart] RemoveItem failed', err);
        return of(null);
      }))
      .subscribe();
  }

  removeFromCart(id: string): void {
    this.setItems(this.cartItemsSubject.value.filter(i => i.id !== id));
    this.pushRemoveToApi(id);
  }

  /** PUT /api/Cart/items/UpdateItem — body: { productId, quantity } */
  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(id);
      return;
    }

    this.setItems(
      this.cartItemsSubject.value.map(i => (i.id === id ? { ...i, quantity } : i))
    );

    if (this.auth.isLoggedIn()) {
      this.http
        .put(`${this.base}${this.ep.update}`, {
          productId: Number(id) || id,
          quantity,
        })
        .pipe(catchError(err => {
          console.error('[Cart] UpdateItem failed', err);
          return of(null);
        }))
        .subscribe();
    }
  }

  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.value);
  }

  openCart(): void {
    this.isCartOpenSubject.next(true);
  }

  closeCart(): void {
    this.isCartOpenSubject.next(false);
  }

  clearCart(): void {
    // No dedicated clear endpoint in the API — remove items one by one
    const ids = this.cartItemsSubject.value.map(item => item.id);
    this.setItems([]);
    this.isCartOpenSubject.next(false);

    for (const id of ids) {
      this.pushRemoveToApi(id);
    }
  }

  syncFromApi(): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.http
      .get(`${this.base}${this.ep.get}`)
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res == null) {
          return;
        }

        const serverItems = this.apiHelper
          .asArray<Record<string, unknown>>(res)
          .map(raw => this.mapCartItem(raw))
          .filter(item => !!item.id)
          .map(item => this.enrich(item));

        // Items added as a guest before signing in live only locally —
        // push them to the account so the server stays the source of truth
        const serverIds = new Set(serverItems.map(item => item.id));
        const guestOnly = this.cartItemsSubject.value.filter(item => !serverIds.has(item.id));
        for (const item of guestOnly) {
          this.pushAddToApi(item, item.quantity);
        }

        this.setItems([...serverItems, ...guestOnly]);
      });
  }

  private mapCartItem(raw: Record<string, unknown>): CartItem {
    const imageUrls = this.apiHelper.extractImageUrls(raw);
    const id = String(raw['productId'] ?? raw['teawareId'] ?? raw['id'] ?? raw['Id'] ?? '');
    return {
      id,
      name: String(raw['name'] ?? raw['Name'] ?? raw['title'] ?? 'Item'),
      type: String(raw['type'] ?? raw['categoryName'] ?? raw['Type'] ?? ''),
      price: Number(raw['price'] ?? raw['unitPrice'] ?? raw['Price'] ?? 0),
      image: imageUrls[0] || String(raw['image'] ?? ''),
      quantity: Number(raw['quantity'] ?? raw['Quantity'] ?? 1),
    };
  }

  /**
   * The API doesn't return images/full details for cart rows — fill gaps from
   * the server catalog first (same IDs), then the current local copy, and only
   * fall back to the static catalog as a last resort.
   */
  private enrich(item: CartItem): CartItem {
    const missingName = !item.name || item.name === 'Item' || item.name === 'string';
    if (item.image && item.type && !missingName && item.price > 0) {
      return item;
    }

    const apiCatalog = this.catalog.getProductById(item.id) ?? this.catalog.getTeawareById(item.id);
    const local = this.cartItemsSubject.value.find(existing => existing.id === item.id);
    const staticCatalog = [...products, ...teawares].find(entry => String(entry.id) === item.id);

    return {
      ...item,
      name: (missingName ? '' : item.name) || apiCatalog?.title || local?.name || staticCatalog?.title || 'Item',
      image: item.image || apiCatalog?.image || local?.image || staticCatalog?.image || '',
      type: item.type || apiCatalog?.type || local?.type || staticCatalog?.type || '',
      price: item.price > 0 ? item.price : apiCatalog?.price ?? local?.price ?? staticCatalog?.price ?? 0,
    };
  }

  /**
   * Signed-in users: state lives in memory + on the server (no localStorage).
   * Guests: state is persisted locally so the cart survives a refresh.
   */
  private setItems(items: CartItem[]): void {
    this.cartItemsSubject.next(items);

    if (this.auth.isLoggedIn()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }

  private readStoredCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
