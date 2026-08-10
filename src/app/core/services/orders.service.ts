import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CartItem } from '../../models/cart-item.model';
import { CheckoutPayload, Order, OrderAddress, OrderStatus } from '../../models/order.model';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { CatalogService } from './catalog.service';
import { ProfileApiService } from './profile-api.service';

/** Legacy key — purged; orders come from the API only. */
const LEGACY_STORAGE_KEY = 't4tea_orders';
const ADDRESS_SNAPSHOTS_KEY = 't4tea_order_address_snapshots';

interface OrderAddressSnapshot {
  address: OrderAddress;
  addressId: string | number | null;
  savedAt: number;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.orders;

  readonly orders$ = this.ordersSubject.asObservable();
  readonly ordersCount$ = this.orders$.pipe(map(orders => orders.length));
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private hadUser = false;
  private syncInFlight: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper,
    private catalog: CatalogService,
    private cart: CartService,
    private profileApi: ProfileApiService
  ) {
    this.purgeLegacyStorage();

    this.catalog.products$.subscribe(() => {
      if (this.ordersSubject.value.length) {
        this.ordersSubject.next(this.ordersSubject.value.map(order => this.enrichOrder(order)));
      }
    });

    this.profileApi.addresses$.subscribe(() => {
      if (this.ordersSubject.value.length) {
        this.ordersSubject.next(this.ordersSubject.value.map(order => this.enrichOrder(order)));
      }
    });

    this.auth.user$
      .pipe(distinctUntilChanged((a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)))
      .subscribe(user => {
        if (user) {
          this.hadUser = true;
          this.purgeLegacyStorage();
        } else if (this.hadUser) {
          this.hadUser = false;
          this.ordersSubject.next([]);
        }
      });
  }

  get orders(): Order[] {
    return this.ordersSubject.value;
  }

  refresh(): void {
    // Allow re-fetch even if a previous sync is still in flight
    this.syncInFlight?.unsubscribe();
    this.syncInFlight = null;
    this.syncFromApi();
  }

  /** GET /api/Orders/GetMyOrders — source of truth is the backend only. */
  syncFromApi(): void {
    if (!this.auth.isLoggedIn()) {
      this.ordersSubject.next([]);
      return;
    }

    if (this.syncInFlight) {
      return;
    }

    this.isLoadingSubject.next(true);

    this.syncInFlight = this.http
      .get<unknown>(`${this.base}${this.ep.getMyOrders}`)
      .pipe(
        map(res => {
          const items = this.extractOrdersList(res);
          console.info(`[Orders] GetMyOrders parsed ${items.length} order(s)`, res);
          return this.sortOrders(items.map(item => this.normalizeOrder(item)));
        }),
        catchError(err => {
          console.error('[Orders] GetMyOrders failed', err);
          if (err?.status === 504 || err?.status === 502) {
            // One retry after cold-start timeout
            return this.http.get<unknown>(`${this.base}${this.ep.getMyOrders}`).pipe(
              map(res => {
                const items = this.extractOrdersList(res);
                console.info(`[Orders] GetMyOrders retry parsed ${items.length} order(s)`, res);
                return this.sortOrders(items.map(item => this.normalizeOrder(item)));
              }),
              catchError(retryErr => {
                console.error('[Orders] GetMyOrders retry failed', retryErr);
                return of(this.ordersSubject.value);
              })
            );
          }
          return of(this.ordersSubject.value);
        }),
        finalize(() => {
          this.syncInFlight = null;
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe(apiOrders => {
        this.ordersSubject.next(apiOrders);
      });
  }

  /** Pull orders array from common API envelope shapes. */
  private extractOrdersList(res: unknown): unknown[] {
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
    const candidates = [
      obj['data'],
      obj['Data'],
      obj['result'],
      obj['Result'],
      obj['value'],
      obj['Value'],
      obj['orders'],
      obj['Orders'],
      obj['items'],
      obj['Items'],
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate) && candidate.length) {
        return candidate;
      }

      if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        const nested = this.apiHelper.asArray<unknown>(candidate);
        if (nested.length) {
          return nested;
        }

        const nestedObj = candidate as Record<string, unknown>;
        for (const key of ['orders', 'Orders', 'items', 'Items', 'data', 'Data', 'result', 'Result']) {
          if (Array.isArray(nestedObj[key])) {
            return nestedObj[key] as unknown[];
          }
        }
      }
    }

    return [];
  }

  /**
   * POST /api/Orders/Checkout.
   * The server cart supplies the items. Send both addressId and an address
   * snapshot so order details do not depend on a later profile-address lookup.
   */
  checkout(payload: CheckoutPayload): Observable<Order> {
    if (!this.auth.isLoggedIn()) {
      return throwError(() => new Error('Please sign in to place an order.'));
    }

    if (payload.addressId == null || payload.addressId === '') {
      return throwError(() => new Error('Please select or save a delivery address.'));
    }

    const addressId = Number(payload.addressId);
    if (!Number.isFinite(addressId) || addressId <= 0) {
      return throwError(() => new Error('Invalid delivery address. Please select a saved address.'));
    }

    const address = {
      label: (payload.address.label || '').trim(),
      street: payload.address.street.trim(),
      city: payload.address.city.trim(),
      governorate: payload.address.governorate.trim(),
      postalCode: (payload.address.postalCode || '').trim(),
      notes: (payload.address.notes || payload.notes || '').trim(),
    };

    if (!address.street || !address.city || !address.governorate) {
      return throwError(() => new Error('Please complete the delivery address.'));
    }

    // Postman sample uses "Visa". "CashOnDelivery" is rejected by API (400 on $.paymentMethod).
    const body: Record<string, unknown> = {
      addressId,
      paymentMethod: payload.paymentMethod === 'card' ? 'Visa' : 'Cash',
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
      address,
      shippingAddress: address,
      street: address.street,
      city: address.city,
      governorate: address.governorate,
      postalCode: address.postalCode,
    };

    const notes = address.notes;
    if (notes) {
      body['notes'] = notes;
    }

    console.info('[Orders] Checkout body', body);

    return this.http.post<unknown>(`${this.base}${this.ep.checkout}`, body).pipe(
      map(res => this.normalizeOrder(this.unwrapOrder(res))),
      tap(order => {
        const enriched =
          order.items.length > 0
            ? order
            : {
                ...order,
                items: payload.items.map(item => ({ ...item })),
                subtotal: order.subtotal || payload.subtotal,
                shipping: order.shipping || payload.shipping,
                total: order.total || payload.total,
                address: order.address.street ? order.address : { ...payload.address },
                addressId: order.addressId ?? payload.addressId,
                fullName: order.fullName || payload.fullName,
                phone: order.phone || payload.phone,
                paymentMethod: payload.paymentMethod,
              };

        const next = this.sortOrders([
          this.enrichOrder(enriched),
          ...this.orders.filter(o => o.id !== enriched.id),
        ]);
        this.rememberOrderAddress(enriched, payload);
        this.ordersSubject.next(next);
      }),
      switchMap(order =>
        this.cart.clearAfterCheckout().pipe(
          tap(() => this.syncFromApi()),
          map(() => order),
          catchError(() => {
            this.syncFromApi();
            return of(order);
          })
        )
      ),
      catchError(err => {
        console.error('[Orders] Checkout failed', err);
        return throwError(() => this.toUserError(err, 'Could not place your order.'));
      })
    );
  }

  private toUserError(err: unknown, fallback: string): Error {
    const httpErr = err as {
      status?: number;
      error?: unknown;
      message?: string;
    };

    if (httpErr?.status === 504 || httpErr?.status === 502 || httpErr?.status === 0) {
      return new Error('Server is slow or unavailable. Please wait a moment and try again.');
    }

    const fromBody = this.readApiErrorMessage(httpErr?.error);
    if (fromBody) {
      return new Error(fromBody);
    }

    if (httpErr?.status === 400) {
      return new Error(
        'Checkout was rejected (400). Check that your cart has items on the server and a valid address is selected.'
      );
    }

    if (httpErr?.status === 401) {
      return new Error('Please sign in again, then retry checkout.');
    }

    return new Error(httpErr?.message || fallback);
  }

  private readApiErrorMessage(error: unknown): string {
    if (!error) {
      return '';
    }

    if (typeof error === 'string') {
      return error.trim();
    }

    if (typeof error === 'object') {
      const obj = error as Record<string, unknown>;
      const candidates = [
        obj['message'],
        obj['Message'],
        obj['title'],
        obj['Title'],
        obj['detail'],
        obj['Detail'],
        obj['error'],
        obj['Error'],
      ];

      for (const candidate of candidates) {
        if (typeof candidate === 'string' && candidate.trim()) {
          return candidate.trim();
        }
      }

      const errors = obj['errors'];
      if (errors && typeof errors === 'object') {
        const parts: string[] = [];
        for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
          const label = key.replace(/^\$\./, '');
          if (Array.isArray(value)) {
            parts.push(...value.map(entry => `${label}: ${String(entry)}`));
          } else if (value != null) {
            parts.push(`${label}: ${String(value)}`);
          }
        }
        if (parts.length) {
          return parts.join(' | ');
        }
      }
    }

    return '';
  }

  getOrderById(id: string): Observable<Order | null> {
    const cached = this.orders.find(order => order.id === id || order.orderNumber === id);
    if (cached) {
      return of(cached);
    }

    if (!this.auth.isLoggedIn()) {
      return of(null);
    }

    return this.http.get<unknown>(`${this.base}${this.ep.getById}/${encodeURIComponent(id)}`).pipe(
      map(res => this.normalizeOrder(this.unwrapOrder(res))),
      catchError(err => {
        console.error('[Orders] GetOrder failed', err);
        return of(null);
      })
    );
  }

  private purgeLegacyStorage(): void {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(`${LEGACY_STORAGE_KEY}_`)) {
          toRemove.push(key);
        }
      }
      for (const key of toRemove) {
        localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
  }

  private unwrapOrder(res: unknown): unknown {
    if (!res || typeof res !== 'object') {
      return res;
    }

    const obj = res as Record<string, unknown>;
    return obj['data'] ?? obj['result'] ?? obj['value'] ?? obj['order'] ?? res;
  }

  private normalizeOrder(raw: unknown): Order {
    const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

    const itemsRaw =
      obj['items'] ??
      obj['Items'] ??
      obj['orderItems'] ??
      obj['OrderItems'] ??
      obj['lineItems'] ??
      obj['LineItems'] ??
      [];

    const items = (Array.isArray(itemsRaw) ? itemsRaw : this.apiHelper.asArray(itemsRaw)).map(item =>
      this.normalizeOrderItem(item)
    );

    const itemsSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const subtotal = this.readNumber(
      obj['subtotal'] ??
        obj['Subtotal'] ??
        obj['subTotal'] ??
        obj['SubTotal'] ??
        obj['itemsTotal'] ??
        obj['ItemsTotal'] ??
        obj['productsTotal'] ??
        obj['ProductsTotal']
    );
    // Only use shipping when the API sends it — never invent a default fee.
    const shippingRaw =
      obj['shipping'] ??
      obj['Shipping'] ??
      obj['shippingFee'] ??
      obj['ShippingFee'] ??
      obj['deliveryFee'] ??
      obj['DeliveryFee'];
    const shipping = shippingRaw == null || shippingRaw === '' ? 0 : this.readNumber(shippingRaw);
    const total = this.readNumber(
      obj['total'] ??
        obj['Total'] ??
        obj['totalPrice'] ??
        obj['TotalPrice'] ??
        obj['grandTotal'] ??
        obj['GrandTotal'] ??
        obj['orderTotal'] ??
        obj['OrderTotal'] ??
        obj['amount'] ??
        obj['Amount']
    );

    const id = String(
      obj['id'] ?? obj['Id'] ?? obj['orderId'] ?? obj['OrderId'] ?? `tmp-${Date.now()}`
    );
    const orderNumber = String(
      obj['orderNumber'] ??
        obj['OrderNumber'] ??
        obj['referenceNumber'] ??
        obj['ReferenceNumber'] ??
        obj['orderNo'] ??
        obj['OrderNo'] ??
        ''
    ).trim();

    const paymentRaw = String(
      obj['paymentMethod'] ?? obj['PaymentMethod'] ?? obj['paymentType'] ?? 'cod'
    ).toLowerCase();

    const addressIdRaw =
      obj['addressId'] ?? obj['AddressId'] ?? obj['userAddressId'] ?? obj['UserAddressId'];
    const addressId =
      addressIdRaw != null && addressIdRaw !== ''
        ? (typeof addressIdRaw === 'number' || typeof addressIdRaw === 'string'
            ? addressIdRaw
            : String(addressIdRaw))
        : null;

    const address = this.parseOrderAddress(obj, addressId);

    // Prefer API money fields; if missing/wrong (e.g. total == shipping only), use line items.
    let computedSubtotal = subtotal;
    let computedTotal = total;

    if (computedSubtotal <= 0 && itemsSubtotal > 0) {
      computedSubtotal = itemsSubtotal;
    }

    if (computedTotal <= 0) {
      computedTotal = computedSubtotal + shipping;
    }

    // Backend sometimes returns total = shipping only (items priced but totals zeroed).
    if (itemsSubtotal > 0 && computedTotal <= shipping && computedSubtotal <= 0) {
      computedSubtotal = itemsSubtotal;
      computedTotal = itemsSubtotal + shipping;
    } else if (itemsSubtotal > 0 && computedTotal === shipping && computedSubtotal === 0) {
      computedSubtotal = itemsSubtotal;
      computedTotal = itemsSubtotal + shipping;
    } else if (computedSubtotal <= 0 && computedTotal > shipping) {
      computedSubtotal = Math.max(computedTotal - shipping, 0);
    }

    return this.enrichOrder({
      id,
      orderNumber: orderNumber || this.formatOrderNumber(id, obj['createdAt'] ?? obj['CreatedAt']),
      items,
      subtotal: computedSubtotal,
      shipping,
      total: computedTotal,
      paymentMethod: paymentRaw.includes('card') || paymentRaw.includes('visa') ? 'card' : 'cod',
      address,
      addressId,
      fullName: String(
        obj['fullName'] ??
          obj['FullName'] ??
          obj['customerName'] ??
          obj['CustomerName'] ??
          obj['recipientName'] ??
          obj['RecipientName'] ??
          ''
      ),
      phone: String(
        obj['phone'] ??
          obj['Phone'] ??
          obj['phoneNumber'] ??
          obj['PhoneNumber'] ??
          obj['shippingPhone'] ??
          obj['ShippingPhone'] ??
          ''
      ),
      status: this.normalizeStatus(obj['status'] ?? obj['Status'] ?? obj['orderStatus'] ?? obj['OrderStatus']),
      createdAt: this.readDate(obj['createdAt'] ?? obj['CreatedAt'] ?? obj['orderDate'] ?? obj['OrderDate']),
    });
  }

  private parseOrderAddress(obj: Record<string, unknown>, addressId: string | number | null): OrderAddress {
    const nestedCandidates = [
      obj['address'],
      obj['Address'],
      obj['shippingAddress'],
      obj['ShippingAddress'],
      obj['deliveryAddress'],
      obj['DeliveryAddress'],
      obj['userAddress'],
      obj['UserAddress'],
    ];

    let nested: Record<string, unknown> | null = null;
    for (const candidate of nestedCandidates) {
      if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        nested = candidate as Record<string, unknown>;
        break;
      }
    }

    const street = this.readAddressPart(
      nested?.['street'],
      nested?.['Street'],
      nested?.['address'],
      nested?.['Address'],
      nested?.['addressLine'],
      nested?.['AddressLine'],
      nested?.['addressLine1'],
      nested?.['AddressLine1'],
      obj['street'],
      obj['Street'],
      obj['shippingStreet'],
      obj['ShippingStreet'],
      obj['addressLine'],
      obj['AddressLine']
    );

    const city = this.readAddressPart(
      nested?.['city'],
      nested?.['City'],
      obj['city'],
      obj['City'],
      obj['shippingCity'],
      obj['ShippingCity']
    );

    const governorate = this.readAddressPart(
      nested?.['governorate'],
      nested?.['Governorate'],
      nested?.['state'],
      nested?.['State'],
      obj['governorate'],
      obj['Governorate'],
      obj['shippingGovernorate'],
      obj['ShippingGovernorate']
    );

    const postalCode = this.readAddressPart(
      nested?.['postalCode'],
      nested?.['PostalCode'],
      obj['postalCode'],
      obj['PostalCode'],
      obj['shippingPostalCode'],
      obj['ShippingPostalCode']
    );

    // Flat string address on the order (avoid treating numeric addressId as street).
    if (!street && !city && !governorate) {
      for (const key of ['address', 'Address', 'fullAddress', 'FullAddress', 'shippingAddressText']) {
        const value = obj[key];
        if (typeof value === 'string' && value.trim() && !/^\d+$/.test(value.trim())) {
          return { street: value.trim(), city: '', governorate: '' };
        }
      }
    }

    const parsed: OrderAddress = { street, city, governorate, postalCode: postalCode || undefined };
    if (this.hasAddressText(parsed)) {
      return parsed;
    }

    return this.resolveAddressFromProfile(addressId) ?? parsed;
  }

  private readAddressPart(...values: unknown[]): string {
    for (const value of values) {
      if (value == null) {
        continue;
      }
      if (typeof value === 'number') {
        continue;
      }
      const text = String(value).trim();
      if (text && text !== '[object Object]' && text !== '.' && text !== '..') {
        return text;
      }
    }
    return '';
  }

  private hasAddressText(address: OrderAddress): boolean {
    return !!(address.street || address.city || address.governorate);
  }

  private resolveAddressFromProfile(addressId: string | number | null): OrderAddress | null {
    const saved = this.profileApi.findAddressById(addressId);
    if (!saved) {
      return null;
    }

    return {
      street: saved.street || saved.address || '',
      city: saved.city || '',
      governorate: saved.governorate || '',
    };
  }

  /**
   * The current backend order DTO may omit address/addressId. Keep only the
   * checkout address snapshot keyed by the backend order id/reference so the
   * UI can still show the exact address selected for that order.
   */
  private rememberOrderAddress(order: Order, payload: CheckoutPayload): void {
    if (!this.hasAddressText(payload.address)) {
      return;
    }

    const snapshots = this.readAddressSnapshots();
    const snapshot: OrderAddressSnapshot = {
      address: { ...payload.address },
      addressId: payload.addressId ?? null,
      savedAt: Date.now(),
    };

    for (const key of [order.id, order.orderNumber]) {
      if (key) {
        snapshots[String(key)] = snapshot;
      }
    }

    this.writeAddressSnapshots(snapshots);
  }

  private resolveAddressSnapshot(order: Order): OrderAddressSnapshot | null {
    const snapshots = this.readAddressSnapshots();
    for (const key of [order.id, order.orderNumber]) {
      if (key && snapshots[String(key)]) {
        return snapshots[String(key)];
      }
    }
    return null;
  }

  private readAddressSnapshots(): Record<string, OrderAddressSnapshot> {
    try {
      const raw = localStorage.getItem(ADDRESS_SNAPSHOTS_KEY);
      if (!raw) {
        return {};
      }
      const parsed = JSON.parse(raw) as Record<string, OrderAddressSnapshot>;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  private writeAddressSnapshots(
    snapshots: Record<string, OrderAddressSnapshot>
  ): void {
    try {
      const cutoff = Date.now() - 180 * 24 * 60 * 60 * 1000;
      const recent = Object.fromEntries(
        Object.entries(snapshots).filter(([, value]) => value.savedAt >= cutoff)
      );
      localStorage.setItem(ADDRESS_SNAPSHOTS_KEY, JSON.stringify(recent));
    } catch {
      // Ignore private mode / storage quota errors.
    }
  }

  private normalizeOrderItem(raw: unknown): CartItem {
    const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const product = (obj['product'] ?? obj['Product']) as Record<string, unknown> | undefined;
    const rawTeawareId = obj['teawareId'] ?? obj['TeawareId'];
    const isTeaware =
      rawTeawareId != null && rawTeawareId !== '' && Number(rawTeawareId) !== 0;

    const id = String(
      (isTeaware ? rawTeawareId : obj['productId'] ?? obj['ProductId']) ??
        obj['id'] ??
        obj['Id'] ??
        product?.['id'] ??
        product?.['Id'] ??
        ''
    );

    const name = String(
      obj['name'] ??
        obj['Name'] ??
        obj['productName'] ??
        obj['ProductName'] ??
        product?.['name'] ??
        product?.['Name'] ??
        'Item'
    );

    const type = String(
      obj['type'] ?? obj['Type'] ?? product?.['type'] ?? product?.['Type'] ?? product?.['category'] ?? ''
    );

    const quantity = Math.max(
      1,
      this.readNumber(obj['quantity'] ?? obj['Quantity'] ?? obj['qty'] ?? obj['Qty'] ?? 1)
    );

    let price = this.readNumber(
      obj['price'] ??
        obj['Price'] ??
        obj['unitPrice'] ??
        obj['UnitPrice'] ??
        product?.['price'] ??
        product?.['Price']
    );

    // Some APIs only send line total.
    if (price <= 0) {
      const lineTotal = this.readNumber(
        obj['total'] ?? obj['Total'] ?? obj['lineTotal'] ?? obj['LineTotal'] ?? obj['totalPrice']
      );
      if (lineTotal > 0) {
        price = lineTotal / quantity;
      }
    }

    const image =
      this.apiHelper.normalizeImageUrl(
        obj['image'] ??
          obj['Image'] ??
          obj['imageUrl'] ??
          obj['ImageUrl'] ??
          product?.['image'] ??
          product?.['Image']
      ) ||
      this.apiHelper.extractImageUrls(product)[0] ||
      '';

    return {
      id,
      kind: isTeaware ? 'teaware' : 'product',
      name,
      type,
      price,
      image,
      quantity,
    };
  }

  private normalizeStatus(value: unknown): OrderStatus {
    const raw = String(value ?? 'processing').trim().toLowerCase();

    // Backend statuses: مؤكد / قيد التجهيز / ملغي (+ English aliases)
    if (
      raw.includes('cancel') ||
      raw.includes('ملغي') ||
      raw.includes('الغاء') ||
      raw.includes('إلغاء')
    ) {
      return 'cancelled';
    }

    if (
      raw.includes('confirm') ||
      raw.includes('مؤكد') ||
      raw.includes('ship') ||
      raw.includes('deliver')
    ) {
      return 'confirmed';
    }

    // قيد التجهيز / pending / processing / placed
    return 'processing';
  }

  private enrichOrder(order: Order): Order {
    const items = order.items.map(item => {
      const catalogItem =
        item.kind === 'teaware'
          ? this.catalog.getTeawareById(item.id)
          : this.catalog.getProductById(item.id);

      return {
        ...item,
        name: item.name || catalogItem?.title || 'Item',
        type: item.type || catalogItem?.type || '',
        price: item.price > 0 ? item.price : catalogItem?.price ?? 0,
        image: item.image || catalogItem?.image || '',
      };
    });

    const itemsSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let subtotal = order.subtotal;
    let total = order.total;
    const shipping = order.shipping > 0 ? order.shipping : 0;

    if (itemsSubtotal > 0 && (subtotal <= 0 || total <= shipping)) {
      subtotal = itemsSubtotal;
      total = itemsSubtotal + shipping;
    } else if (subtotal <= 0 && total > shipping) {
      subtotal = Math.max(total - shipping, 0);
    } else if (total <= 0 && subtotal > 0) {
      total = subtotal + shipping;
    }

    let address = order.address;
    let addressId = order.addressId ?? null;
    if (!this.hasAddressText(address)) {
      address = this.resolveAddressFromProfile(order.addressId ?? null) ?? address;
    }
    if (!this.hasAddressText(address)) {
      const snapshot = this.resolveAddressSnapshot(order);
      if (snapshot) {
        address = { ...snapshot.address };
        addressId = snapshot.addressId;
      }
    }

    return {
      ...order,
      items,
      subtotal,
      shipping,
      total,
      address,
      addressId,
    };
  }

  private sortOrders(orders: Order[]): Order[] {
    return [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  private readNumber(value: unknown): number {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  }

  private readDate(value: unknown): string {
    if (!value) {
      return new Date().toISOString();
    }

    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  }

  private formatOrderNumber(id: string, createdAt?: unknown): string {
    const year = new Date(this.readDate(createdAt)).getFullYear();
    const digits = id.replace(/\D/g, '').slice(-5).padStart(5, '0');
    return `T4-${year}-${digits}`;
  }
}
