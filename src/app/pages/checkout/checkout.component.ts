import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { ProfileApiService } from '../../core/services/profile-api.service';
import { CartItem } from '../../models/cart-item.model';
import { UserAddress } from '../../models/profile.model';
import {
  priceChangeAnimation,
  trackByPrice,
} from '../../shared/animations/price-change.animation';

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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [priceChangeAnimation],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('governorateDropdown') governorateDropdown!: ElementRef<HTMLElement>;

  checkoutForm: FormGroup;
  paymentMethod = 'card';
  shipping = 0;
  orderPlaced = false;
  isSubmitting = false;
  isGovernorateOpen = false;
  governorateSearch = '';
  savedAddresses: UserAddress[] = [];
  selectedAddressId: string | number | null = null;
  isAddingNewAddress = false;
  isLoadingAddresses = false;
  addressesLoaded = false;
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  total$: Observable<number>;
  readonly governorates = EGYPT_GOVERNORATES;
  readonly trackByPrice = trackByPrice;

  private paymentSub?: Subscription;
  private userSub?: Subscription;
  private addressesSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private profileApi: ProfileApiService,
    private ordersService: OrdersService
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      governorate: ['', Validators.required],
      postalCode: [''],
      notes: [''],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      saveAddressLabel: ['', [Validators.required, Validators.minLength(2)]],
      paymentMethod: ['card', Validators.required],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvc: [''],
      cardName: [''],
    });

    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.total$ = this.cartTotal$.pipe(map(total => total + this.shipping));

    if (!this.authService.isLoggedIn()) {
      this.addressesLoaded = true;
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.profileApi.syncAddresses();
    }

    this.addressesSub = combineLatest([
      this.profileApi.addresses$,
      this.profileApi.addressesLoaded$,
    ]).subscribe(([list, loaded]) => {
      if (!this.authService.isLoggedIn()) {
        this.savedAddresses = [];
        this.addressesLoaded = true;
        this.isLoadingAddresses = false;
        return;
      }

      this.isLoadingAddresses = !loaded && list.length === 0;
      if (!loaded) {
        return;
      }

      this.addressesLoaded = true;
      this.applyAddressList(list);
    });

    this.userSub = this.authService.user$.subscribe(user => {
      if (user) {
        this.checkoutForm.patchValue({
          fullName: user.name,
          phone: user.phone || '',
        });
        return;
      }

      this.savedAddresses = [];
      this.selectedAddressId = null;
      this.isAddingNewAddress = false;
      this.isLoadingAddresses = false;
      this.addressesLoaded = true;
    });

    this.paymentSub = this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.paymentMethod = method;
      this.updateCardValidators(method === 'card');
    });

    this.updateCardValidators(true);
  }

  private applyAddressList(list: UserAddress[]): void {
    this.savedAddresses = list.filter(
      item => !!(item.street || item.address || item.city || item.governorate)
    );

    if (!this.authService.isLoggedIn()) {
      this.syncNewAddressValidators(true);
      return;
    }

    if (this.savedAddresses.length > 0) {
      if (!this.isAddingNewAddress) {
        const current = this.savedAddresses.find(item => item.id === this.selectedAddressId);
        this.applySavedAddress(current ?? this.savedAddresses[0]);
      }
      return;
    }

    this.selectedAddressId = null;
    if (!this.isAddingNewAddress) {
      this.clearAddressFields(false);
    } else {
      this.syncNewAddressValidators(true);
    }
  }

  selectSavedAddress(item: UserAddress): void {
    if (this.selectedAddressId === item.id) {
      this.selectedAddressId = null;
      this.clearAddressFields();
      return;
    }

    this.applySavedAddress(item);
  }

  private applySavedAddress(item: UserAddress): void {
    this.selectedAddressId = item.id ?? null;
    this.isAddingNewAddress = false;
    this.checkoutForm.patchValue({
      address: item.street || item.address || '',
      city: item.city || '',
      governorate: item.governorate || '',
      postalCode: item.postalCode || '',
      notes: item.notes || '',
      saveAddressLabel: item.label || '',
    });
    this.checkoutForm.get('address')?.markAsUntouched();
    this.checkoutForm.get('city')?.markAsUntouched();
    this.checkoutForm.get('governorate')?.markAsUntouched();
    this.checkoutForm.get('saveAddressLabel')?.markAsUntouched();
    this.syncNewAddressValidators(false);
  }

  startNewAddress(): void {
    if (this.isAddingNewAddress) {
      this.isAddingNewAddress = false;
      if (this.savedAddresses.length > 0) {
        const current = this.savedAddresses.find(item => item.id === this.selectedAddressId);
        this.applySavedAddress(current ?? this.savedAddresses[0]);
      } else {
        this.clearAddressFields();
      }
      return;
    }

    this.isAddingNewAddress = true;
    this.selectedAddressId = null;
    this.clearAddressFields();
  }

  private clearAddressFields(syncValidators = true): void {
    this.checkoutForm.patchValue({
      address: '',
      city: '',
      governorate: '',
      postalCode: '',
      notes: '',
      saveAddressLabel: '',
    });
    this.checkoutForm.get('address')?.markAsUntouched();
    this.checkoutForm.get('city')?.markAsUntouched();
    this.checkoutForm.get('governorate')?.markAsUntouched();
    this.checkoutForm.get('saveAddressLabel')?.markAsUntouched();
    if (syncValidators) {
      this.syncNewAddressValidators(true);
    }
  }

  /** Match profile address form validators when typing a new address. */
  private syncNewAddressValidators(isNewAddress: boolean): void {
    const label = this.checkoutForm.get('saveAddressLabel');
    const street = this.checkoutForm.get('address');

    if (isNewAddress) {
      label?.setValidators([Validators.required, Validators.minLength(2)]);
      street?.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      label?.clearValidators();
      street?.setValidators([Validators.required]);
    }

    label?.updateValueAndValidity({ emitEvent: false });
    street?.updateValueAndValidity({ emitEvent: false });
  }

  formatAddressPreview(item: UserAddress): string {
    return [item.street, item.city, item.governorate].filter(Boolean).join(', ');
  }

  /** Saved address cards for signed-in users (includes "Add New Address"). */
  get showSavedAddressPicker(): boolean {
    return this.isLoggedIn && this.addressesLoaded && !this.isLoadingAddresses;
  }

  /** Address form — guests always; signed-in users only after "Add New Address". */
  get showAddressFields(): boolean {
    if (!this.addressesLoaded || this.isLoadingAddresses) {
      return false;
    }

    if (!this.isLoggedIn) {
      return true;
    }

    return this.isAddingNewAddress;
  }

  get needsSavedAddressSelection(): boolean {
    return this.isLoggedIn && !this.isAddingNewAddress && this.selectedAddressId == null;
  }

  ngOnDestroy(): void {
    this.paymentSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.addressesSub?.unsubscribe();
  }

  get isCartEmpty(): boolean {
    return this.cartService.cartCount === 0;
  }

  get selectedGovernorate(): string {
    return this.checkoutForm.get('governorate')?.value ?? '';
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
  }

  toggleGovernorateDropdown(): void {
    this.isGovernorateOpen = !this.isGovernorateOpen;
    if (this.isGovernorateOpen) {
      this.governorateSearch = '';
    }
  }

  selectGovernorate(governorate: string): void {
    this.checkoutForm.get('governorate')?.setValue(governorate);
    this.checkoutForm.get('governorate')?.markAsTouched();
    this.isGovernorateOpen = false;
    this.governorateSearch = '';
  }

  closeGovernorateDropdown(): void {
    if (!this.isGovernorateOpen) {
      return;
    }

    this.isGovernorateOpen = false;
    this.checkoutForm.get('governorate')?.markAsTouched();
  }

  isInvalid(controlName: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.isCartEmpty || this.isSubmitting) {
      return;
    }

    if (this.checkoutForm.invalid || this.needsSavedAddressSelection) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const raw = this.checkoutForm.getRawValue();
    const checkoutPayload = {
      items: this.cartService.cartItems,
      subtotal: this.cartService.cartTotal,
      shipping: this.shipping,
      total: this.cartService.cartTotal + this.shipping,
      paymentMethod: raw.paymentMethod as 'card' | 'cod',
      address: {
        label: (raw.saveAddressLabel || '').trim() || undefined,
        street: raw.address.trim(),
        city: raw.city.trim(),
        governorate: raw.governorate.trim(),
        postalCode: raw.postalCode?.trim() || undefined,
        notes: raw.notes?.trim() || undefined,
      },
      fullName: raw.fullName.trim(),
      phone: raw.phone.trim(),
      addressId: this.selectedAddressId as string | number | null,
      notes: raw.notes?.trim() || '',
    };

    // Same payload as profile "Save Address" — Checkout needs addressId.
    const ensureAddressId$: Observable<unknown> =
      checkoutPayload.addressId == null && this.showAddressFields
        ? this.profileApi
            .addAddress({
              label: (raw.saveAddressLabel || '').trim(),
              street: raw.address,
              city: raw.city,
              governorate: raw.governorate,
              postalCode: raw.postalCode?.trim() || undefined,
              notes: raw.notes?.trim() || undefined,
            })
            .pipe(
              tap(saved => {
                if (saved.id != null) {
                  checkoutPayload.addressId = saved.id;
                  this.selectedAddressId = saved.id;
                }
                const withoutDuplicate = this.savedAddresses.filter(item => item.id !== saved.id);
                this.savedAddresses = [...withoutDuplicate, saved];
              })
            )
        : of(null);

    this.cartService
      .prepareForCheckout()
      .pipe(
        tap(serverItems => {
          const subtotal = serverItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          checkoutPayload.items = serverItems;
          checkoutPayload.subtotal = subtotal;
          checkoutPayload.total = subtotal + this.shipping;
        }),
        switchMap(() => ensureAddressId$),
        switchMap(() => this.ordersService.checkout(checkoutPayload))
      )
      .subscribe({
        next: () => {
          this.orderPlaced = true;
          this.isSubmitting = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err: { message?: string }) => {
          this.isSubmitting = false;
          console.error('[Checkout] Order failed', err);
          window.alert(
            err?.message ||
              'Could not place your order. Please check your address and try again.'
          );
        },
      });
  }

  private updateCardValidators(required: boolean): void {
    const cardNumber = this.checkoutForm.get('cardNumber');
    const cardExpiry = this.checkoutForm.get('cardExpiry');
    const cardCvc = this.checkoutForm.get('cardCvc');
    const cardName = this.checkoutForm.get('cardName');

    if (required) {
      cardNumber?.setValidators([Validators.required, Validators.pattern(/^[\d\s-]{16,23}$/)]);
      cardExpiry?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/)]);
      cardCvc?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
      cardName?.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      cardNumber?.clearValidators();
      cardExpiry?.clearValidators();
      cardCvc?.clearValidators();
      cardName?.clearValidators();
      cardNumber?.setValue('');
      cardExpiry?.setValue('');
      cardCvc?.setValue('');
      cardName?.setValue('');
    }

    cardNumber?.updateValueAndValidity({ emitEvent: false });
    cardExpiry?.updateValueAndValidity({ emitEvent: false });
    cardCvc?.updateValueAndValidity({ emitEvent: false });
    cardName?.updateValueAndValidity({ emitEvent: false });
  }
}
