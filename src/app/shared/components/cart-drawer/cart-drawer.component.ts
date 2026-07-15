import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import gsap from 'gsap';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../models/cart-item.model';
import {
  priceChangeAnimation,
  trackByPrice,
} from '../../animations/price-change.animation';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
  animations: [priceChangeAnimation],
})
export class CartDrawerComponent implements OnInit, OnDestroy {
  @ViewChild('backdrop') backdrop?: ElementRef<HTMLElement>;
  @ViewChild('panel') panel?: ElementRef<HTMLElement>;

  isRendered = false;
  isCartOpen$!: Observable<boolean>;
  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;

  readonly trackByPrice = trackByPrice;

  private subscription = new Subscription();
  private isClosing = false;

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isCartOpen$ = this.cartService.isCartOpen$;
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.isLoggedIn$ = this.authService.user$.pipe(map(() => this.authService.isLoggedIn()));

    this.subscription.add(
      this.cartService.isCartOpen$.subscribe((open) => {
        if (open) {
          this.openDrawer();
        } else {
          this.closeDrawer();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.body.style.overflow = '';
    if (this.backdrop?.nativeElement) {
      gsap.killTweensOf(this.backdrop.nativeElement);
    }
    if (this.panel?.nativeElement) {
      gsap.killTweensOf(this.panel.nativeElement);
    }
  }

  closeCart(): void {
    this.cartService.closeCart();
  }

  removeFromCart(id: string): void {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: string, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  goToShop(): void {
    this.closeCart();
    this.router.navigate(['/shop']);
  }

  handleCheckout(): void {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }

  goToLogin(): void {
    this.closeCart();
    this.router.navigate(['/login']);
  }

  private openDrawer(): void {
    if (this.isClosing) {
      return;
    }

    this.isRendered = true;
    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      if (!this.backdrop?.nativeElement || !this.panel?.nativeElement) {
        return;
      }

      gsap.killTweensOf([this.backdrop.nativeElement, this.panel.nativeElement]);
      gsap.set(this.backdrop.nativeElement, { opacity: 0, pointerEvents: 'auto' });
      gsap.set(this.panel.nativeElement, { x: '100%' });

      gsap.to(this.backdrop.nativeElement, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(this.panel.nativeElement, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      document.body.style.overflow = 'hidden';
    });
  }

  private closeDrawer(): void {
    if (!this.isRendered || this.isClosing) {
      return;
    }

    if (!this.backdrop?.nativeElement || !this.panel?.nativeElement) {
      this.isRendered = false;
      document.body.style.overflow = '';
      return;
    }

    this.isClosing = true;
    gsap.killTweensOf([this.backdrop.nativeElement, this.panel.nativeElement]);

    gsap.to(this.backdrop.nativeElement, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });

    gsap.to(this.panel.nativeElement, {
      x: '100%',
      duration: 0.35,
      ease: 'power3.in',
      onComplete: () => {
        this.isRendered = false;
        this.isClosing = false;
        document.body.style.overflow = '';
        this.cdr.detectChanges();
      },
    });
  }
}
