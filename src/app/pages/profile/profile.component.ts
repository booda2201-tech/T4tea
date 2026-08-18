import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { AuthService, AuthUser } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { OrdersService } from '../../core/services/orders.service';
import { ProfileApiService } from '../../core/services/profile-api.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { AddressPayload, UserAddress } from '../../models/profile.model';
import { Order, OrderStatus } from '../../models/order.model';
import { WishlistItem } from '../../models/wishlist-item.model';
import { isComingSoon } from '../../shared/utils/coming-soon.util';

type ProfileTab = 'overview' | 'addresses' | 'orders' | 'wishlist';

const EGYPT_GOVERNORATES = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Qalyubia',
  'Port Said',
  'Suez',
  'Luxor',
  'Aswan',
  'Dakahlia',
  'Sharqia',
  'Gharbia',
  'Monufia',
  'Beheira',
  'Ismailia',
  'Fayoum',
  'Minya',
  'Assiut',
  'Sohag',
  'Qena',
  'Red Sea',
  'New Valley',
  'Matrouh',
  'North Sinai',
  'South Sinai',
  'Beni Suef',
  'Damietta',
  'Kafr El Sheikh',
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('governorateDropdown') governorateDropdown?: ElementRef<HTMLElement>;

  user: AuthUser | null = null;
  activeTab: ProfileTab = 'overview';
  isLoadingProfile = false;
  isSavingProfile = false;
  profileMessage = '';
  profileError = '';

  addresses: UserAddress[] = [];
  isLoadingAddresses = false;
  isSavingAddress = false;
  addressMessage = '';
  addressError = '';
  editingAddressId: string | number | null = null;
  showAddressForm = false;
  showPhoneChangeConfirm = false;
  isGovernorateOpen = false;
  governorateSearch = '';

  profileForm: FormGroup;
  addressForm: FormGroup;
  readonly governorates = EGYPT_GOVERNORATES;

  readonly navItems: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'bi-grid' },
    { id: 'addresses', label: 'Addresses', icon: 'bi-geo-alt' },
    { id: 'orders', label: 'Order History', icon: 'bi-bag' },
    { id: 'wishlist', label: 'Wishlist', icon: 'bi-heart' },
  ];

  readonly quickLinks = [
    { label: 'Shop Tea', route: '/shop', icon: 'bi-cup-hot' },
    { label: 'Teawares', route: '/teawares', icon: 'bi-droplet' },
    { label: 'Checkout', route: '/checkout', icon: 'bi-cart3' },
  ];

  wishlistItems$ = this.wishlistService.wishlistItems$;
  wishlistCount$ = this.wishlistService.wishlistCount$;
  isLoadingWishlist$ = this.wishlistService.isLoading$;
  orders$ = this.ordersService.orders$;
  ordersCount$ = this.ordersService.ordersCount$;
  isLoadingOrders$ = this.ordersService.isLoading$;

  expandedOrderId: string | null = null;
  ordersCurrentPage = 1;
  ordersStatusFilter: OrderStatus | 'all' = 'all';
  readonly ordersPageSize = 5;
  readonly orderStatusFilters: { id: OrderStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'processing', label: 'Processing' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];
  readonly orderProgressSteps: { id: OrderStatus; label: string }[] = [
    { id: 'processing', label: 'Processing' },
    { id: 'confirmed', label: 'Confirmed' },
  ];

  private userSub?: Subscription;
  private addressesSub?: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private ordersService: OrdersService,
    private profileApi: ProfileApiService,
    private catalogService: CatalogService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    });

    this.addressForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      governorate: ['', Validators.required],
      postalCode: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userSub = this.authService.user$.subscribe(user => {
      this.user = user;
      if (user && !this.profileForm.dirty) {
        this.patchProfileForm(user);
      }
    });

    this.addressesSub = combineLatest([
      this.profileApi.addresses$,
      this.profileApi.addressesLoaded$,
    ]).subscribe(([list, loaded]) => {
      this.addresses = list;
      this.isLoadingAddresses = !loaded;
    });

    // Always pull orders from the backend when opening profile
    this.ordersService.refresh();

    this.isLoadingProfile = true;
    this.profileApi.get().subscribe({
      next: profile => {
        this.isLoadingProfile = false;
        if (profile) {
          this.patchProfileForm({
            name: String(profile.fullName || profile.userName || profile.name || this.user?.name || ''),
            phone: String(profile.phone || profile.phoneNumber || this.user?.phone || ''),
          });
        }
      },
      error: () => {
        this.isLoadingProfile = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.addressesSub?.unsubscribe();
  }

  get userInitials(): string {
    if (!this.user?.name) {
      return 'T';
    }

    return this.user.name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  get displayContact(): string {
    return this.user?.phone || this.user?.email || '';
  }

  get addressCount(): number {
    return this.addresses.length;
  }

  get selectedGovernorate(): string {
    return this.addressForm.get('governorate')?.value ?? '';
  }

  get filteredGovernorates(): string[] {
    const query = this.governorateSearch.trim().toLowerCase();
    if (!query) {
      return this.governorates;
    }

    return this.governorates.filter(governorate => governorate.toLowerCase().includes(query));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.governorateDropdown?.nativeElement.contains(event.target as Node)) {
      this.closeGovernorateDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isGovernorateOpen = false;
    this.showPhoneChangeConfirm = false;
  }

  toggleGovernorateDropdown(): void {
    this.isGovernorateOpen = !this.isGovernorateOpen;
    if (this.isGovernorateOpen) {
      this.governorateSearch = '';
    }
  }

  selectGovernorate(governorate: string): void {
    this.addressForm.get('governorate')?.setValue(governorate);
    this.addressForm.get('governorate')?.markAsTouched();
    this.isGovernorateOpen = false;
    this.governorateSearch = '';
  }

  closeGovernorateDropdown(): void {
    if (!this.isGovernorateOpen) {
      return;
    }

    this.isGovernorateOpen = false;
    this.addressForm.get('governorate')?.markAsTouched();
  }

  setActiveTab(tab: ProfileTab): void {
    this.activeTab = tab;
    if (tab === 'addresses' && !this.addresses.length && !this.isLoadingAddresses) {
      this.profileApi.syncAddresses();
    }
    if (tab === 'orders') {
      this.profileApi.syncAddresses();
      this.ordersService.refresh();
    }
    if (tab === 'wishlist') {
      this.wishlistService.refresh();
    }
  }

  saveProfile(): void {
    this.profileMessage = '';
    this.profileError = '';

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.profileError = 'Please fill in your name and a valid Egyptian phone number.';
      return;
    }

    const raw = this.profileForm.getRawValue();
    const currentPhone = (this.user?.phone || '').trim();
    const phoneChanged = !!currentPhone && raw.phone.trim() !== currentPhone;

    // Phone is the login identifier — warn before changing it.
    if (phoneChanged) {
      this.showPhoneChangeConfirm = true;
      return;
    }

    this.performProfileSave();
  }

  confirmPhoneChange(): void {
    this.showPhoneChangeConfirm = false;
    this.performProfileSave(true);
  }

  cancelPhoneChange(): void {
    this.showPhoneChangeConfirm = false;
  }

  private performProfileSave(phoneChanged = false): void {
    const raw = this.profileForm.getRawValue();
    this.isSavingProfile = true;

    this.profileApi
      .update({
        fullName: raw.name,
        phone: raw.phone,
      })
      .subscribe({
        next: () => {
          this.isSavingProfile = false;
          this.profileForm.markAsPristine();
          this.profileMessage = phoneChanged
            ? 'Profile updated. Use your new phone number the next time you sign in.'
            : 'Profile updated successfully.';
          if (phoneChanged) {
            this.authService.updateStoredCredentialsPhone(raw.phone);
          }
        },
        error: err => {
          this.isSavingProfile = false;
          this.profileError = this.extractErrorMessage(err, 'Could not update profile. Please try again.');
        },
      });
  }

  loadAddresses(): void {
    this.addressError = '';
    this.profileApi.getAddresses().subscribe({
      next: list => {
        this.addresses = list;
      },
      error: () => {
        this.addressError = 'Could not load addresses.';
      },
    });
  }

  openAddAddress(): void {
    this.editingAddressId = null;
    this.showAddressForm = true;
    this.addressMessage = '';
    this.addressError = '';
    this.addressForm.reset({
      label: 'Home',
      street: '',
      city: '',
      governorate: '',
      postalCode: '',
      notes: '',
    });
  }

  openEditAddress(item: UserAddress): void {
    this.editingAddressId = item.id ?? null;
    this.showAddressForm = true;
    this.addressMessage = '';
    this.addressError = '';
    this.addressForm.reset({
      label: item.label || item.fullName || 'Home',
      street: item.street || item.address || '',
      city: item.city || '',
      governorate: item.governorate || '',
      postalCode: item.postalCode || '',
      notes: item.notes || '',
    });
  }

  cancelAddressForm(): void {
    this.showAddressForm = false;
    this.editingAddressId = null;
    this.isGovernorateOpen = false;
    this.governorateSearch = '';
    this.addressForm.reset();
  }

  saveAddress(): void {
    this.addressMessage = '';
    this.addressError = '';

    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      this.addressError = 'Please complete all required address fields.';
      return;
    }

    const raw = this.addressForm.getRawValue();
    const payload: AddressPayload = {
      label: raw.label,
      street: raw.street,
      city: raw.city,
      governorate: raw.governorate,
      postalCode: raw.postalCode || undefined,
      notes: raw.notes || undefined,
      userId: this.authService.getUserId() || this.user?.id,
    };

    this.isSavingAddress = true;
    const request$ =
      this.editingAddressId != null
        ? this.profileApi.updateAddress(this.editingAddressId, payload)
        : this.profileApi.addAddress(payload);

    request$.subscribe({
      next: () => {
        this.isSavingAddress = false;
        this.addressMessage = this.editingAddressId != null ? 'Address updated.' : 'Address added.';
        this.cancelAddressForm();
        this.loadAddresses();
      },
      error: err => {
        this.isSavingAddress = false;
        this.addressError = this.extractErrorMessage(err, 'Could not save address. Please try again.');
      },
    });
  }

  deleteAddress(item: UserAddress): void {
    if (item.id == null) {
      return;
    }

    const ok = window.confirm('Delete this address?');
    if (!ok) {
      return;
    }

    this.addressMessage = '';
    this.addressError = '';
    this.profileApi.deleteAddress(item.id).subscribe({
      next: () => {
        this.addressMessage = 'Address deleted.';
        if (this.editingAddressId === item.id) {
          this.cancelAddressForm();
        }
        this.loadAddresses();
      },
      error: err => {
        this.addressError = this.extractErrorMessage(err, 'Could not delete address.');
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  removeFromWishlist(id: string): void {
    this.wishlistService.removeFromWishlist(id);
  }

  addToCart(item: WishlistItem): void {
    if (isComingSoon(item.price)) {
      return;
    }
    this.cartService.addToCart({
      id: item.id,
      kind: this.productKind(item) === 'teaware' ? 'teaware' : 'product',
      name: item.name,
      type: item.type,
      price: item.price,
      image: item.image,
    });
  }

  productKind(item: WishlistItem): 'tea' | 'teaware' {
    return this.catalogService.resolveKind(item.id, {
      name: item.name,
      type: item.type,
      price: item.price,
    });
  }

  toggleOrderDetails(orderId: string): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  setOrdersStatusFilter(filter: OrderStatus | 'all'): void {
    this.ordersStatusFilter = filter;
    this.ordersCurrentPage = 1;
    this.expandedOrderId = null;
  }

  setOrdersPage(page: number): void {
    this.ordersCurrentPage = page;
    this.expandedOrderId = null;
  }

  filterOrders(orders: Order[]): Order[] {
    if (this.ordersStatusFilter === 'all') {
      return orders;
    }

    return orders.filter(order => order.status === this.ordersStatusFilter);
  }

  paginateOrders(orders: Order[]): Order[] {
    const start = (this.ordersCurrentPage - 1) * this.ordersPageSize;
    return orders.slice(start, start + this.ordersPageSize);
  }

  getOrdersTotalPages(totalItems: number): number {
    return Math.max(1, Math.ceil(totalItems / this.ordersPageSize));
  }

  getOrdersPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  ordersRangeLabel(totalItems: number): string {
    if (totalItems === 0) {
      return '0 orders';
    }

    const start = (this.ordersCurrentPage - 1) * this.ordersPageSize + 1;
    const end = Math.min(this.ordersCurrentPage * this.ordersPageSize, totalItems);
    return `${start}-${end} of ${totalItems}`;
  }

  isOrderExpanded(orderId: string): boolean {
    return this.expandedOrderId === orderId;
  }

  orderDisplayId(order: Order): string {
    return order.orderNumber || order.id;
  }

  orderStatusLabel(status: OrderStatus): string {
    switch (status) {
      case 'confirmed':
      case 'shipped':
      case 'delivered':
        return 'Confirmed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Processing';
    }
  }

  /** CSS status class — collapse shipping statuses into confirmed. */
  orderStatusClass(status: OrderStatus): OrderStatus {
    if (status === 'shipped' || status === 'delivered') {
      return 'confirmed';
    }
    return status;
  }

  formatOrderAddress(order: Order): string {
    const parts = [
      order.address?.governorate,
      order.address?.city,
      order.address?.street,
      order.address?.postalCode,
    ]
      .map(part => (part || '').trim())
      .filter(part => part && part !== '.' && part !== '..');

    if (parts.length) {
      return parts.join(', ');
    }

    if (order.addressId != null) {
      const saved = this.addresses.find(item => String(item.id) === String(order.addressId));
      if (saved) {
        return [saved.governorate, saved.city, saved.street || saved.address, saved.postalCode]
          .map(part => (part || '').trim())
          .filter(Boolean)
          .join(', ');
      }
    }

    return 'Address unavailable';
  }

  isOrderStepComplete(status: OrderStatus, step: OrderStatus): boolean {
    if (status === 'cancelled') {
      return step === 'processing';
    }

    // No shipping/delivery flow — treat shipped/delivered as confirmed+.
    const rank: Record<OrderStatus, number> = {
      processing: 1,
      confirmed: 2,
      shipped: 2,
      delivered: 2,
      cancelled: 0,
    };

    return rank[status] >= rank[step];
  }

  isOrderStepCurrent(status: OrderStatus, step: OrderStatus): boolean {
    if (status === 'cancelled') {
      return false;
    }

    const effective: OrderStatus =
      status === 'shipped' || status === 'delivered' ? 'confirmed' : status;

    return effective === step;
  }

  isInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private patchProfileForm(user: Partial<AuthUser> & { name?: string; phone?: string }): void {
    this.profileForm.patchValue({
      name: user.name || '',
      phone: user.phone || '',
    });
    this.profileForm.markAsPristine();
  }

  private extractErrorMessage(err: unknown, fallback: string): string {
    if (!err || typeof err !== 'object') {
      return fallback;
    }

    const httpErr = err as { error?: unknown; status?: number; message?: string };
    const body = httpErr.error;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (body && typeof body === 'object') {
      const obj = body as Record<string, unknown>;
      const msg = obj['message'] ?? obj['title'] ?? obj['detail'] ?? obj['error'];
      if (typeof msg === 'string' && msg.trim()) {
        return msg;
      }

      const errors = obj['errors'];
      if (errors && typeof errors === 'object') {
        const first = Object.values(errors as Record<string, unknown>)[0];
        if (Array.isArray(first) && typeof first[0] === 'string') {
          return first[0];
        }
        if (typeof first === 'string') {
          return first;
        }
      }
    }

    if (httpErr.status === 401 || httpErr.status === 302) {
      return 'Your session expired. Please sign out and sign in again.';
    }

    if (httpErr.status === 0) {
      return 'Your session expired. Please sign out and sign in again.';
    }

    if (httpErr.status === 404) {
      return 'API endpoint not found. Check the backend route.';
    }

    return fallback;
  }
}
