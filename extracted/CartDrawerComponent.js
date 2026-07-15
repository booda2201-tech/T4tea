import gsap from 'gsap';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/cart.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = ["backdrop"];
const _c1 = ["panel"];
function CartDrawerComponent_ng_container_0_ng_container_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13);
    i0.ɵɵelement(2, "i", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 15);
    i0.ɵɵtext(4, "Your cart is empty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 16);
    i0.ɵɵtext(6, "Discover our remarkable blends.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 17);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_ng_container_11_div_1_Template_button_click_7_listener() {
      i0.ɵɵrestoreView(_r9);
      const ctx_r8 = i0.ɵɵnextContext(3);
      return i0.ɵɵresetView(ctx_r8.goToShop());
    });
    i0.ɵɵtext(8, " Shop Tea ");
    i0.ɵɵelementEnd()();
  }
}
function CartDrawerComponent_ng_container_0_ng_container_11_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 21);
    i0.ɵɵelement(2, "img", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 23)(4, "div")(5, "div", 24)(6, "h4", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 26);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_ng_container_11_div_2_div_1_Template_button_click_8_listener() {
      const restoredCtx = i0.ɵɵrestoreView(_r13);
      const item_r11 = restoredCtx.$implicit;
      const ctx_r12 = i0.ɵɵnextContext(4);
      return i0.ɵɵresetView(ctx_r12.removeFromCart(item_r11.id));
    });
    i0.ɵɵelement(9, "i", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 28);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 29)(13, "div", 30)(14, "button", 31);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_ng_container_11_div_2_div_1_Template_button_click_14_listener() {
      const restoredCtx = i0.ɵɵrestoreView(_r13);
      const item_r11 = restoredCtx.$implicit;
      const ctx_r14 = i0.ɵɵnextContext(4);
      return i0.ɵɵresetView(ctx_r14.updateQuantity(item_r11.id, item_r11.quantity - 1));
    });
    i0.ɵɵelement(15, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 33);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 31);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_ng_container_11_div_2_div_1_Template_button_click_18_listener() {
      const restoredCtx = i0.ɵɵrestoreView(_r13);
      const item_r11 = restoredCtx.$implicit;
      const ctx_r15 = i0.ɵɵnextContext(4);
      return i0.ɵɵresetView(ctx_r15.updateQuantity(item_r11.id, item_r11.quantity + 1));
    });
    i0.ɵɵelement(19, "i", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "span", 35);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", item_r11.image, i0.ɵɵsanitizeUrl)("alt", item_r11.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r11.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r11.type);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r11.quantity);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", item_r11.price * item_r11.quantity, " EGP");
  }
}
function CartDrawerComponent_ng_container_0_ng_container_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, CartDrawerComponent_ng_container_0_ng_container_11_div_2_div_1_Template, 22, 6, "div", 19);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const items_r5 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", items_r5);
  }
}
function CartDrawerComponent_ng_container_0_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CartDrawerComponent_ng_container_0_ng_container_11_div_1_Template, 9, 0, "div", 10);
    i0.ɵɵtemplate(2, CartDrawerComponent_ng_container_0_ng_container_11_div_2_Template, 2, 1, "div", 11);
    i0.ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const items_r5 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", items_r5.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", items_r5.length > 0);
  }
}
function CartDrawerComponent_ng_container_0_ng_container_13_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const total_r20 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", total_r20, " EGP");
  }
}
function CartDrawerComponent_ng_container_0_ng_container_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38);
    i0.ɵɵelement(2, "input", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 40)(4, "span", 41);
    i0.ɵɵtext(5, "Subtotal");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CartDrawerComponent_ng_container_0_ng_container_13_div_1_span_6_Template, 2, 1, "span", 42);
    i0.ɵɵpipe(7, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 43);
    i0.ɵɵtext(9, "Shipping and taxes calculated at checkout.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 44);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_ng_container_13_div_1_Template_button_click_10_listener() {
      i0.ɵɵrestoreView(_r22);
      const ctx_r21 = i0.ɵɵnextContext(3);
      return i0.ɵɵresetView(ctx_r21.handleCheckout());
    });
    i0.ɵɵtext(11, " Proceed to Checkout ");
    i0.ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(7, 1, ctx_r18.cartTotal$));
  }
}
function CartDrawerComponent_ng_container_0_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CartDrawerComponent_ng_container_0_ng_container_13_div_1_Template, 12, 3, "div", 36);
    i0.ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const items_r17 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", items_r17.length > 0);
  }
}
function CartDrawerComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1, 2);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_Template_div_click_1_listener() {
      i0.ɵɵrestoreView(_r24);
      const ctx_r23 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r23.closeCart());
    });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 3, 4)(5, "div", 5)(6, "h2", 6);
    i0.ɵɵtext(7, "Your Cart");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function CartDrawerComponent_ng_container_0_Template_button_click_8_listener() {
      i0.ɵɵrestoreView(_r24);
      const ctx_r25 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r25.closeCart());
    });
    i0.ɵɵelement(9, "i", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 9);
    i0.ɵɵtemplate(11, CartDrawerComponent_ng_container_0_ng_container_11_Template, 3, 2, "ng-container", 0);
    i0.ɵɵpipe(12, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, CartDrawerComponent_ng_container_0_ng_container_13_Template, 2, 1, "ng-container", 0);
    i0.ɵɵpipe(14, "async");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(12, 2, ctx_r0.cartItems$));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(14, 4, ctx_r0.cartItems$));
  }
}
export let CartDrawerComponent = /*#__PURE__*/(() => {
  class CartDrawerComponent {
    constructor(cartService, router) {
      this.cartService = cartService;
      this.router = router;
      this.subscription = new Subscription();
    }
    ngOnInit() {
      this.isCartOpen$ = this.cartService.isCartOpen$;
      this.cartItems$ = this.cartService.cartItems$;
      this.cartTotal$ = this.cartService.cartTotal$;
      this.subscription.add(this.cartService.isCartOpen$.subscribe(open => this.animateDrawer(open)));
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    closeCart() {
      this.cartService.closeCart();
    }
    removeFromCart(id) {
      this.cartService.removeFromCart(id);
    }
    updateQuantity(id, quantity) {
      this.cartService.updateQuantity(id, quantity);
    }
    goToShop() {
      this.closeCart();
      this.router.navigate(['/shop']);
    }
    handleCheckout() {
      this.closeCart();
      this.router.navigate(['/checkout']);
    }
    animateDrawer(open) {
      if (!this.backdrop?.nativeElement || !this.panel?.nativeElement) {
        return;
      }
      if (open) {
        gsap.to(this.backdrop.nativeElement, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(this.panel.nativeElement, {
          x: 0,
          duration: 0.4,
          ease: 'power3.out'
        });
      } else {
        gsap.to(this.backdrop.nativeElement, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in'
        });
        gsap.to(this.panel.nativeElement, {
          x: '100%',
          duration: 0.35,
          ease: 'power3.in'
        });
      }
    }
    static {
      this.ɵfac = function CartDrawerComponent_Factory(t) {
        return new (t || CartDrawerComponent)(i0.ɵɵdirectiveInject(i1.CartService), i0.ɵɵdirectiveInject(i2.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: CartDrawerComponent,
        selectors: [["app-cart-drawer"]],
        viewQuery: function CartDrawerComponent_Query(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
          }
          if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.backdrop = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.panel = _t.first);
          }
        },
        decls: 2,
        vars: 3,
        consts: [[4, "ngIf"], [1, "cart-drawer-backdrop", "fixed", "inset-0", "bg-ink/40", "backdrop-blur-sm", "z-50", "open", 3, "click"], ["backdrop", ""], [1, "cart-drawer-panel", "fixed", "top-0", "right-0", "h-full", "w-full", "md:w-[450px]", "bg-cream", "shadow-2xl", "z-50", "flex", "flex-col"], ["panel", ""], [1, "flex", "items-center", "justify-between", "p-6", "border-b", "border-ink/10"], [1, "font-serif", "text-2xl", "text-emerald", "mb-0"], ["type", "button", 1, "btn", "btn-link", "p-2", "hover:bg-sand", "rounded-full", "text-ink/70", "border-0", 3, "click"], [1, "bi", "bi-x-lg"], [1, "flex-1", "overflow-y-auto", "p-6"], ["class", "h-full flex flex-col items-center justify-center text-center space-y-4", 4, "ngIf"], ["class", "space-y-6", 4, "ngIf"], [1, "h-full", "flex", "flex-col", "items-center", "justify-center", "text-center", "space-y-4"], [1, "w-16", "h-16", "bg-sand", "rounded-full", "flex", "items-center", "justify-center", "text-emerald/50"], [1, "bi", "bi-bag", "text-3xl"], [1, "font-serif", "text-xl", "text-emerald"], [1, "text-ink/60", "font-light", "text-sm"], ["type", "button", 1, "mt-4", "border", "border-emerald", "text-emerald", "px-8", "py-3", "hover:bg-emerald", "hover:text-cream", "transition-colors", "text-sm", "font-medium", "tracking-wide", "bg-transparent", 3, "click"], [1, "space-y-6"], ["class", "flex gap-4", 4, "ngFor", "ngForOf"], [1, "flex", "gap-4"], [1, "w-24", "h-24", "bg-sand", "flex-shrink-0", "overflow-hidden"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "flex-1", "flex", "flex-col", "justify-between"], [1, "flex", "justify-between", "items-start"], [1, "font-serif", "text-lg", "text-emerald", "leading-tight", "mb-0"], ["type", "button", 1, "btn", "btn-link", "p-0", "text-ink/40", "hover:text-terracotta", "border-0", 3, "click"], [1, "bi", "bi-x"], [1, "text-xs", "text-mocha", "mt-1", "mb-0"], [1, "flex", "items-center", "justify-between", "mt-4"], [1, "flex", "items-center", "border", "border-ink/20"], ["type", "button", 1, "btn", "btn-link", "p-1", "text-ink/70", "border-0", 3, "click"], [1, "bi", "bi-dash"], [1, "w-8", "text-center", "text-sm"], [1, "bi", "bi-plus"], [1, "font-medium", "text-sm"], ["class", "border-t border-ink/10 p-6 bg-cream", 4, "ngIf"], [1, "border-t", "border-ink/10", "p-6", "bg-cream"], [1, "mb-4"], ["type", "text", "placeholder", "Promo code", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-ink/70", "font-light"], ["class", "font-serif text-xl text-emerald", 4, "ngIf"], [1, "text-xs", "text-ink/50", "mb-6", "font-light", "text-center"], ["type", "button", 1, "w-full", "bg-emerald", "text-cream", "py-4", "hover:bg-emerald-soft", "transition-colors", "tracking-wide", "font-medium", "border-0", 3, "click"]],
        template: function CartDrawerComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵtemplate(0, CartDrawerComponent_ng_container_0_Template, 15, 6, "ng-container", 0);
            i0.ɵɵpipe(1, "async");
          }
          if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.isCartOpen$));
          }
        },
        dependencies: [i3.NgForOf, i3.NgIf, i3.AsyncPipe],
        styles: [".cart-drawer-backdrop[_ngcontent-%COMP%]{opacity:0}.cart-drawer-panel[_ngcontent-%COMP%]{transform:translate(100%)}"]
      });
    }
  }
  return CartDrawerComponent;
})();