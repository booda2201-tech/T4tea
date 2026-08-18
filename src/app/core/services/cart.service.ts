import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, of, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CartItem, CartProductInput } from '../../models/cart-item.model';
import { products, teawares } from '../../data/products';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';
import { CatalogService } from './catalog.service';
import { isComingSoon } from '../../shared/utils/coming-soon.util';

/** Legacy key — purged on startup; cart is never persisted locally. */
const LEGACY_STORAGE_KEY = 't4tea_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private pendingMutationsSubject = new BehaviorSubject<number>(0);
  private pendingRemovalIds = new Set<string>();

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
  private syncInFlight: Subscription | null = null;
  private syncRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private cartSyncGeneration = 0;
  private holdEmptyUntil = 0;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper,
    private catalog: CatalogService
  ) {
    this.purgeLegacyStorage();

    this.catalog.products$.subscribe(() => {
      if (this.cartItemsSubject.value.length) {
        this.cartItemsSubject.next(this.cartItemsSubject.value.map(item => this.enrich(item)));
      }
    });

    // AppDataService owns sync-on-login — here we only clear on logout.
    this.auth.user$
      .pipe(distinctUntilChanged((a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)))
      .subscribe(user => {
        if (user) {
          this.hadUser = true;
          this.purgeLegacyStorage();
        } else if (this.hadUser) {
          this.hadUser = false;
          this.cancelSyncInFlight();
          this.clearSyncRetry();
          this.setItems([]);
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
    if (isComingSoon(item.price)) {
      return;
    }

    const current = this.cartItemsSubject.value;
    const existing = current.find(i => this.isSameItem(i, item.id, item.kind));
    let next: CartItem[];

    if (existing) {
      next = current.map(i =>
        this.isSameItem(i, item.id, item.kind)
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      next = [...current, { ...item, quantity }];
    }

    this.holdEmptyUntil = 0;
    this.setItems(next);
    this.isCartOpenSubject.next(true);
    this.pushAddToApi(item, quantity);
  }

  private pushAddToApi(item: CartProductInput, quantity: number): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    const body =
      item.kind === 'teaware'
        ? { teawareId: Number(item.id) || item.id, quantity }
        : { productId: Number(item.id) || item.id, quantity };

    this.beginMutation();
    this.http
      .post(`${this.base}${this.ep.add}`, body)
      .pipe(
        catchError(err => {
          console.error('[Cart] AddToCart failed', err);
          return of(null);
        }),
        finalize(() => this.endMutation())
      )
      .subscribe();
  }

  private pushRemoveToApi(id: string, kind: CartItem['kind']): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    const normalizedId = String(id);
    const itemKey = this.itemKey(normalizedId, kind);
    this.pendingRemovalIds.add(itemKey);

    // Postman: DELETE /api/Cart/items/RemoveItem?productId=&teawareId=
    const params = new HttpParams().set(
      kind === 'teaware' ? 'teawareId' : 'productId',
      normalizedId
    );

    this.beginMutation();
    this.http
      .delete(`${this.base}${this.ep.remove}`, { params })
      .pipe(
        catchError(err => {
          console.error('[Cart] RemoveItem failed', err);
          return of(null);
        }),
        finalize(() => {
          this.pendingRemovalIds.delete(itemKey);
          this.endMutation();
        })
      )
      .subscribe();
  }

  removeFromCart(id: string, kind: CartItem['kind']): void {
    this.setItems(
      this.cartItemsSubject.value.filter(i => !this.isSameItem(i, id, kind))
    );
    this.pushRemoveToApi(id, kind);
  }

  updateQuantity(id: string, kind: CartItem['kind'], quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(id, kind);
      return;
    }

    this.setItems(
      this.cartItemsSubject.value.map(i =>
        this.isSameItem(i, id, kind) ? { ...i, quantity } : i
      )
    );

    if (this.auth.isLoggedIn()) {
      const body =
        kind === 'teaware'
          ? { teawareId: Number(id) || id, quantity }
          : { productId: Number(id) || id, quantity };

      this.beginMutation();
      this.http
        .put(`${this.base}${this.ep.update}`, body)
        .pipe(
          catchError(err => {
            console.error('[Cart] UpdateItem failed', err);
            return of(null);
          }),
          finalize(() => this.endMutation())
        )
        .subscribe();
    }
  }

  /**
   * Wait for cart writes, then verify the exact server cart used by Checkout.
   * Never create an order from a stale/partial server cart.
   */
  prepareForCheckout(): Observable<CartItem[]> {
    if (!this.auth.isLoggedIn()) {
      return throwError(() => new Error('Please sign in before checkout.'));
    }

    const expected = [...this.cartItemsSubject.value];

    return this.pendingMutationsSubject.pipe(
      filter(count => count === 0),
      take(1),
      switchMap(() => this.http.get<unknown>(`${this.base}${this.ep.get}`)),
      map(res =>
        this.apiHelper
          .asArray<Record<string, unknown>>(res)
          .map(raw => this.mapCartItem(raw))
          .filter(item => !!item.id)
          .map(item => this.enrich(item))
      ),
      switchMap(serverItems => {
        if (!this.cartsMatch(expected, serverItems)) {
          this.setItems(serverItems);
          return throwError(
            () =>
              new Error(
                'Your cart changed while syncing with the server. Please review it and place the order again.'
              )
          );
        }

        this.setItems(serverItems);
        return of(serverItems);
      })
    );
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
    const items = [...this.cartItemsSubject.value];
    this.setItems([]);
    this.isCartOpenSubject.next(false);

    if (!this.auth.isLoggedIn()) {
      return;
    }

    for (const item of items) {
      this.pushRemoveToApi(item.id, item.kind);
    }
  }

  /**
   * After Checkout the backend clears the cart — wipe local state, then
   * confirm empty cart from GET /api/Cart.
   */
  clearAfterCheckout(): Observable<void> {
    this.cancelSyncInFlight();
    this.clearSyncRetry();
    this.pendingRemovalIds.clear();
    this.cartSyncGeneration++;
    this.holdEmptyUntil = Date.now() + 60_000;
    this.purgeLegacyStorage();
    this.setItems([]);
    this.isCartOpenSubject.next(false);

    if (!this.auth.isLoggedIn()) {
      return of(void 0);
    }

    const generation = this.cartSyncGeneration;

    return this.http.get(`${this.base}${this.ep.get}`).pipe(
      catchError(() => of(null)),
      tap(res => {
        if (generation !== this.cartSyncGeneration || res == null) {
          return;
        }

        const serverItems = this.apiHelper
          .asArray<Record<string, unknown>>(res)
          .map(raw => this.mapCartItem(raw))
          .filter(item => !!item.id)
          .map(item => this.enrich(item));

        this.applySyncedItems(serverItems);
      }),
      map(() => void 0)
    );
  }

  /** Called by AppDataService after auth is ready — not by every page. */
  syncFromApi(): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    const generation = this.cartSyncGeneration;
    this.cancelSyncInFlight();

    this.syncInFlight = this.http
      .get(`${this.base}${this.ep.get}`)
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.syncInFlight = null;
        })
      )
      .subscribe(res => {
        if (generation !== this.cartSyncGeneration) {
          return;
        }

        if (res == null) {
          return;
        }

        const serverItems = this.apiHelper
          .asArray<Record<string, unknown>>(res)
          .map(raw => this.mapCartItem(raw))
          .filter(
            item =>
              !!item.id &&
              !this.pendingRemovalIds.has(this.itemKey(item.id, item.kind))
          )
          .map(item => this.enrich(item));

        this.applySyncedItems(serverItems);
      });
  }

  private applySyncedItems(items: CartItem[]): void {
    if (this.holdEmptyUntil > Date.now() && items.length > 0) {
      this.setItems([]);
      this.scheduleSyncRetry();
      return;
    }

    if (items.length === 0) {
      this.holdEmptyUntil = 0;
    }

    this.setItems(items);
  }

  private scheduleSyncRetry(): void {
    if (this.syncRetryTimer || !this.auth.isLoggedIn()) {
      return;
    }

    this.syncRetryTimer = setTimeout(() => {
      this.syncRetryTimer = null;
      if (this.holdEmptyUntil > Date.now()) {
        this.syncFromApi();
      }
    }, 1500);
  }

  private cancelSyncInFlight(): void {
    this.syncInFlight?.unsubscribe();
    this.syncInFlight = null;
  }

  private clearSyncRetry(): void {
    if (this.syncRetryTimer) {
      clearTimeout(this.syncRetryTimer);
      this.syncRetryTimer = null;
    }
  }

  private purgeLegacyStorage(): void {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Ignore private-mode / quota errors
    }
  }

  private mapCartItem(raw: Record<string, unknown>): CartItem {
    const imageUrls = this.apiHelper.extractImageUrls(raw);
    const rawTeawareId = raw['teawareId'] ?? raw['TeawareId'];
    const rawProductId = raw['productId'] ?? raw['ProductId'];
    const hasTeawareId =
      rawTeawareId != null &&
      rawTeawareId !== '' &&
      Number(rawTeawareId) !== 0;
    const kind: CartItem['kind'] = hasTeawareId ? 'teaware' : 'product';
    const id = String(
      (hasTeawareId ? rawTeawareId : rawProductId) ??
        raw['id'] ??
        raw['Id'] ??
        ''
    );

    return {
      id,
      kind,
      name: String(raw['name'] ?? raw['Name'] ?? raw['title'] ?? 'Item'),
      type: String(raw['type'] ?? raw['categoryName'] ?? raw['Type'] ?? ''),
      price: Number(raw['price'] ?? raw['unitPrice'] ?? raw['Price'] ?? 0),
      image: imageUrls[0] || String(raw['image'] ?? ''),
      quantity: Number(raw['quantity'] ?? raw['Quantity'] ?? 1),
    };
  }

  private enrich(item: CartItem): CartItem {
    const missingName = !item.name || item.name === 'Item' || item.name === 'string';
    if (item.image && item.type && !missingName && item.price > 0) {
      return item;
    }

    const apiCatalog =
      item.kind === 'teaware'
        ? this.catalog.getTeawareById(item.id)
        : this.catalog.getProductById(item.id);
    const local = this.cartItemsSubject.value.find(existing =>
      this.isSameItem(existing, item.id, item.kind)
    );
    const staticCatalog = (item.kind === 'teaware' ? teawares : products).find(
      entry => String(entry.id) === item.id
    );

    return {
      ...item,
      name: (missingName ? '' : item.name) || apiCatalog?.title || local?.name || staticCatalog?.title || 'Item',
      image: item.image || apiCatalog?.image || local?.image || staticCatalog?.image || '',
      type: item.type || apiCatalog?.type || local?.type || staticCatalog?.type || '',
      price: item.price > 0 ? item.price : apiCatalog?.price ?? local?.price ?? staticCatalog?.price ?? 0,
    };
  }

  /** In-memory only — never persisted to localStorage. */
  private setItems(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
  }

  private itemKey(id: string, kind: CartItem['kind']): string {
    return `${kind}:${String(id)}`;
  }

  private isSameItem(
    item: Pick<CartItem, 'id' | 'kind'>,
    id: string,
    kind: CartItem['kind']
  ): boolean {
    return item.id === String(id) && item.kind === kind;
  }

  private cartsMatch(expected: CartItem[], actual: CartItem[]): boolean {
    if (expected.length !== actual.length) {
      return false;
    }

    return expected.every(item => {
      const match = actual.find(serverItem =>
        this.isSameItem(serverItem, item.id, item.kind)
      );
      return !!match && match.quantity === item.quantity;
    });
  }

  private beginMutation(): void {
    this.pendingMutationsSubject.next(this.pendingMutationsSubject.value + 1);
  }

  private endMutation(): void {
    this.pendingMutationsSubject.next(
      Math.max(0, this.pendingMutationsSubject.value - 1)
    );
  }
}
