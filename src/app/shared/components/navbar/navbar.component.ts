import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { asyncScheduler, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, observeOn } from 'rxjs/operators';
import gsap from 'gsap';
import { CartService } from '../../../core/services/cart.service';
import { SearchService } from '../../../core/services/search.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input() lightOnTop = false;
  @Input() useHeroScrollControl = false;

  @ViewChild('navEl', { static: true }) navEl!: ElementRef<HTMLElement>;

  isScrolled = false;
  isVisible = true;
  isProfileMenuOpen = false;
  isMobileMenuOpen = false;
  lastScrollY = 0;
  cartCount$!: Observable<number>;
  wishlistCount$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;
  private inHeroZone = false;
  private routerSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$;
    this.wishlistCount$ = this.wishlistService.wishlistCount$;
    // asyncScheduler defers login-state changes to the next tick so session
    // updates during HTTP handling never mutate bindings mid change-detection
    this.isLoggedIn$ = this.authService.user$.pipe(
      map(user => !!user),
      distinctUntilChanged(),
      observeOn(asyncScheduler)
    );
  }

  ngAfterViewInit(): void {
    if (this.useHeroScrollControl) {
      this.inHeroZone = true;
    }

    gsap.from(this.navEl.nativeElement, {
      y: -100,
      duration: 0.6,
      ease: 'power2.out',
      immediateRender: false,
    });

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.closeMobileMenu());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    document.body.style.overflow = '';
  }

  enterHeroControl(): void {
    this.inHeroZone = true;
    this.isScrolled = false;
    this.isVisible = true;
    gsap.killTweensOf(this.navEl.nativeElement);
  }

  exitHeroControl(): void {
    this.inHeroZone = false;
    this.isVisible = true;

    const nav = this.navEl.nativeElement;
    nav.style.opacity = '';
    nav.style.pointerEvents = '';
    nav.style.transform = '';

    gsap.set(nav, { y: 0, opacity: 1 });
    this.isScrolled = window.scrollY > 50;
    this.lastScrollY = window.scrollY;
  }

  setHeroOverlayOpacity(opacity: number): void {
    if (!this.useHeroScrollControl || !this.inHeroZone) {
      return;
    }

    this.isScrolled = false;

    const nav = this.navEl.nativeElement;
    nav.style.opacity = String(opacity);
    nav.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
    nav.style.transform = opacity < 0.05 ? 'translateY(-100%)' : 'translateY(0)';
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY = window.scrollY;

    if (this.useHeroScrollControl && this.inHeroZone) {
      this.isScrolled = false;
      this.lastScrollY = currentScrollY;
      return;
    }

    this.isScrolled = currentScrollY > 50;

    const shouldHide = currentScrollY > this.lastScrollY && currentScrollY > 100;
    if (shouldHide !== !this.isVisible) {
      this.isVisible = !shouldHide;
      gsap.to(this.navEl.nativeElement, {
        y: this.isVisible ? 0 : -100,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    this.lastScrollY = currentScrollY;
  }

  toggleCart(): void {
    this.closeMobileMenu();
    this.cartService.toggleCart();
  }

  openSearch(): void {
    this.closeProfileMenu();
    this.closeMobileMenu();
    this.cartService.closeCart();
    this.searchService.openSearch();
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }

    this.closeProfileMenu();
    this.cartService.closeCart();
    this.searchService.closeSearch();
    this.isMobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu(): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
  }

  openProfileMenu(): void {
    this.isProfileMenuOpen = true;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeProfileMenu();
    this.closeMobileMenu();
    this.router.navigate(['/home']);
  }
}
