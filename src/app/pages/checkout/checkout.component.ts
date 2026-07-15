import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  shipping = 50;
  orderPlaced = false;
  isSubmitting = false;
  isGovernorateOpen = false;
  governorateSearch = '';
  savedAddresses: UserAddress[] = [];
  selectedAddressId: string | number | null = null;
  isAddingNewAddress = false;
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  total$: Observable<number>;
  readonly governorates = EGYPT_GOVERNORATES;
  readonly trackByPrice = trackByPrice;

  private paymentSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private profileApi: ProfileApiService,
    private ordersService: OrdersService
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      governorate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      saveAddress: [false],
      saveAddressLabel: ['Home'],
      paymentMethod: ['card', Validators.required],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvc: [''],
      cardName: [''],
    });

    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.total$ = this.cartTotal$.pipe(map(total => total + this.shipping));
  }

  ngOnInit(): void {
    this.cartService.syncFromApi();

    const user = this.authService.currentUser;
    if (user) {
      this.checkoutForm.patchValue({
        fullName: user.name,
        phone: user.phone || '',
      });
    }

    this.loadSavedAddresses();

    this.paymentSub = this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.paymentMethod = method;
      this.updateCardValidators(method === 'card');
    });

    this.updateCardValidators(true);
  }

  private loadSavedAddresses(): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.profileApi.getAddresses().subscribe(list => {
      this.savedAddresses = list.filter(item => item.street || item.city);
    });
  }

  selectSavedAddress(item: UserAddress): void {
    if (this.selectedAddressId === item.id) {
      this.selectedAddressId = null;
      this.clearAddressFields();
      return;
    }

    this.selectedAddressId = item.id ?? null;
    this.isAddingNewAddress = false;
    this.checkoutForm.patchValue({
      address: item.street || '',
      city: item.city || '',
      governorate: item.governorate || '',
      saveAddress: false,
    });
    this.checkoutForm.get('address')?.markAsTouched();
    this.checkoutForm.get('city')?.markAsTouched();
    this.checkoutForm.get('governorate')?.markAsTouched();
  }

  startNewAddress(): void {
    if (this.isAddingNewAddress) {
      this.isAddingNewAddress = false;
      this.clearAddressFields();
      return;
    }

    this.isAddingNewAddress = true;
    this.selectedAddressId = null;
    this.clearAddressFields();
  }

  private clearAddressFields(): void {
    this.checkoutForm.patchValue({
      address: '',
      city: '',
      governorate: '',
      saveAddress: false,
    });
    this.checkoutForm.get('address')?.markAsUntouched();
    this.checkoutForm.get('city')?.markAsUntouched();
    this.checkoutForm.get('governorate')?.markAsUntouched();
  }

  formatAddressPreview(item: UserAddress): string {
    return [item.street, item.city, item.governorate].filter(Boolean).join(', ');
  }

  /** Address inputs are only visible when adding a new address (or when there is nothing saved). */
  get showAddressFields(): boolean {
    return this.savedAddresses.length === 0 || this.isAddingNewAddress;
  }

  /** Show "save to profile" option only for logged-in users typing a new address. */
  get canOfferSaveAddress(): boolean {
    return this.authService.isLoggedIn() && this.selectedAddressId === null && this.showAddressFields;
  }

  get wantsToSaveAddress(): boolean {
    return !!this.checkoutForm.get('saveAddress')?.value;
  }

  ngOnDestroy(): void {
    this.paymentSub?.unsubscribe();
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

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const raw = this.checkoutForm.getRawValue();

    if (this.canOfferSaveAddress && this.wantsToSaveAddress) {
      this.profileApi
        .addAddress({
          label: (raw.saveAddressLabel || 'Home').trim() || 'Home',
          street: raw.address,
          city: raw.city,
          governorate: raw.governorate,
        })
        .subscribe({
          error: err => console.error('[Checkout] Could not save address to profile', err),
        });
    }

    const items = this.cartService.cartItems;
    const subtotal = this.cartService.cartTotal;
    this.ordersService.placeOrder({
      items,
      subtotal,
      shipping: this.shipping,
      total: subtotal + this.shipping,
      paymentMethod: raw.paymentMethod,
      address: {
        street: raw.address,
        city: raw.city,
        governorate: raw.governorate,
      },
      fullName: raw.fullName,
      phone: raw.phone,
    });

    setTimeout(() => {
      this.cartService.clearCart();
      this.orderPlaced = true;
      this.isSubmitting = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
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
