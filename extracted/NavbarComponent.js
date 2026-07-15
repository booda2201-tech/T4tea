import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import gsap from 'gsap';
export let NavbarComponent = class NavbarComponent {
  constructor(cartService) {
    this.cartService = cartService;
    this.isScrolled = false;
    this.isVisible = true;
    this.lastScrollY = 0;
  }
  ngOnInit() {
    this.cartCount$ = this.cartService.cartCount$;
    gsap.from(this.navEl.nativeElement, {
      y: -100,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
  onScroll() {
    const currentScrollY = window.scrollY;
    this.isScrolled = currentScrollY > 50;
    const shouldHide = currentScrollY > this.lastScrollY && currentScrollY > 100;
    if (shouldHide !== !this.isVisible) {
      this.isVisible = !shouldHide;
      gsap.to(this.navEl.nativeElement, {
        y: this.isVisible ? 0 : -100,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    this.lastScrollY = currentScrollY;
  }
  toggleCart() {
    this.cartService.toggleCart();
  }
};
__decorate([ViewChild('navEl', {
  static: true
})], NavbarComponent.prototype, "navEl", void 0);
__decorate([HostListener('window:scroll')], NavbarComponent.prototype, "onScroll", null);
NavbarComponent = __decorate([Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})], NavbarComponent);