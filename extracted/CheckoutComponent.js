import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/cart.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
function CheckoutComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵelement(1, "input", 53);
    i0.ɵɵelementStart(2, "div", 15);
    i0.ɵɵelement(3, "input", 54)(4, "input", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 56);
    i0.ɵɵelementEnd();
  }
}
function CheckoutComponent_div_72_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57)(1, "div", 58);
    i0.ɵɵelement(2, "img", 59);
    i0.ɵɵelementStart(3, "span", 60);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 61)(6, "div")(7, "h4", 62);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 63);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "span", 32);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", item_r4.image, i0.ɵɵsanitizeUrl)("alt", item_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.quantity);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r4.price * item_r4.quantity, " EGP");
  }
}
function CheckoutComponent_span_78_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const subtotal_r5 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", subtotal_r5, " EGP");
  }
}
function CheckoutComponent_span_88_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const total_r6 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", total_r6, " EGP");
  }
}
const _c0 = function (a0) {
  return {
    "bg-sand/30": a0
  };
};
export let CheckoutComponent = /*#__PURE__*/(() => {
  class CheckoutComponent {
    constructor(cartService) {
      this.cartService = cartService;
      this.paymentMethod = 'card';
      this.shipping = 50;
      this.cartItems$ = this.cartService.cartItems$;
      this.cartTotal$ = this.cartService.cartTotal$;
      this.total$ = this.cartTotal$.pipe(map(total => total + this.shipping));
    }
    setPaymentMethod(method) {
      this.paymentMethod = method;
    }
    static {
      this.ɵfac = function CheckoutComponent_Factory(t) {
        return new (t || CheckoutComponent)(i0.ɵɵdirectiveInject(i1.CartService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: CheckoutComponent,
        selectors: [["app-checkout"]],
        decls: 90,
        vars: 19,
        consts: [[1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20", "flex", "flex-col", "md:flex-row"], [1, "flex-1", "p-6", "md:p-12", "lg:p-24", "overflow-y-auto"], [1, "max-w-xl", "mx-auto"], ["routerLink", "/shop", 1, "inline-flex", "items-center", "text-sm", "text-emerald", "hover:text-mocha", "transition-colors", "mb-12", "font-medium", "tracking-wide", "no-underline"], [1, "bi", "bi-arrow-left", "me-2"], [1, "mb-12"], [1, "font-serif", "text-4xl", "text-emerald", "mb-2"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha"], [1, "space-y-12"], [1, "font-serif", "text-2xl", "text-emerald", "mb-6"], [1, "space-y-4"], ["type", "email", "placeholder", "Email Address", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], [1, "flex", "items-center", "space-x-3", "cursor-pointer"], ["type", "checkbox", 1, "accent-emerald"], [1, "text-sm", "text-ink/70", "font-light"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "text", "placeholder", "First Name", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Last Name", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Phone Number", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], [1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "text-ink/70"], ["value", ""], ["value", "cairo"], ["value", "giza"], ["value", "alexandria"], ["type", "text", "placeholder", "City / Area", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Postal Code", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Street Address & Building No.", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Apartment, suite, etc. (optional)", 1, "w-full", "border", "border-ink/20", "bg-transparent", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], [1, "text-sm", "text-ink/60", "font-light", "mb-4"], [1, "border", "border-ink/20", "rounded-sm", "overflow-hidden"], [1, "flex", "items-center", "p-4", "cursor-pointer", "border-b", "border-ink/20", "transition-colors", 3, "ngClass"], ["type", "radio", "name", "payment", "value", "card", 1, "accent-emerald", "me-4", 3, "checked", "change"], [1, "text-sm", "font-medium"], ["class", "p-4 bg-sand/10 space-y-4 border-b border-ink/20", 4, "ngIf"], [1, "flex", "items-center", "p-4", "cursor-pointer", "transition-colors", 3, "ngClass"], ["type", "radio", "name", "payment", "value", "cod", 1, "accent-emerald", "me-4", 3, "checked", "change"], ["type", "button", 1, "w-full", "bg-emerald", "text-cream", "py-4", "hover:bg-emerald-soft", "transition-colors", "tracking-wide", "font-medium", "text-lg", "border-0"], [1, "mt-12", "flex", "items-center", "justify-center", "space-x-8", "text-ink/50", "text-xs", "font-light"], [1, "flex", "items-center"], [1, "bi", "bi-shield-check", "me-2"], [1, "bi", "bi-truck", "me-2"], [1, "w-full", "md:w-[400px]", "lg:w-[500px]", "bg-sand", "p-6", "md:p-12", "lg:p-24", "border-l", "border-ink/10"], [1, "sticky", "top-12"], [1, "font-serif", "text-2xl", "text-emerald", "mb-8"], [1, "space-y-6", "mb-8", "max-h-[40vh]", "overflow-y-auto", "pe-2"], ["class", "flex gap-4", 4, "ngFor", "ngForOf"], [1, "border-t", "border-ink/10", "pt-6", "space-y-4", "mb-6"], [1, "flex", "justify-between", "text-sm", "text-ink/70", "font-light"], [4, "ngIf"], [1, "border-t", "border-ink/10", "pt-6", "flex", "justify-between", "items-center"], [1, "font-medium", "text-lg"], ["class", "font-serif text-3xl text-emerald", 4, "ngIf"], [1, "p-4", "bg-sand/10", "space-y-4", "border-b", "border-ink/20"], ["type", "text", "placeholder", "Card Number", 1, "w-full", "border", "border-ink/20", "bg-cream", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Expiration Date (MM/YY)", 1, "w-full", "border", "border-ink/20", "bg-cream", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Security Code", 1, "w-full", "border", "border-ink/20", "bg-cream", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], ["type", "text", "placeholder", "Name on Card", 1, "w-full", "border", "border-ink/20", "bg-cream", "px-4", "py-3", "text-sm", "outline-none", "focus:border-emerald", "transition-colors", "placeholder:text-ink/40"], [1, "flex", "gap-4"], [1, "relative", "w-16", "h-16", "bg-cream", "flex-shrink-0", "border", "border-ink/10"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "absolute", "-top-2", "-right-2", "bg-ink", "text-cream", "text-[10px]", "w-5", "h-5", "rounded-full", "flex", "items-center", "justify-center"], [1, "flex-1", "flex", "justify-between", "items-center"], [1, "font-medium", "text-emerald", "text-sm", "mb-0"], [1, "text-xs", "text-mocha", "mb-0"], [1, "font-serif", "text-3xl", "text-emerald"]],
        template: function CheckoutComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
            i0.ɵɵelement(4, "i", 4);
            i0.ɵɵtext(5, " Return to Shop ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 5)(7, "h1", 6);
            i0.ɵɵtext(8, "T4 TEA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 7);
            i0.ɵɵtext(10, "Secure Checkout");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "form", 8)(12, "section")(13, "h2", 9);
            i0.ɵɵtext(14, "Contact Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 10);
            i0.ɵɵelement(16, "input", 11);
            i0.ɵɵelementStart(17, "label", 12);
            i0.ɵɵelement(18, "input", 13);
            i0.ɵɵelementStart(19, "span", 14);
            i0.ɵɵtext(20, "Email me with news and offers");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(21, "section")(22, "h2", 9);
            i0.ɵɵtext(23, "Shipping Address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 10)(25, "div", 15);
            i0.ɵɵelement(26, "input", 16)(27, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "input", 18);
            i0.ɵɵelementStart(29, "select", 19)(30, "option", 20);
            i0.ɵɵtext(31, "Select Governorate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "option", 21);
            i0.ɵɵtext(33, "Cairo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "option", 22);
            i0.ɵɵtext(35, "Giza");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "option", 23);
            i0.ɵɵtext(37, "Alexandria");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 15);
            i0.ɵɵelement(39, "input", 24)(40, "input", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(41, "input", 26)(42, "input", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "section")(44, "h2", 9);
            i0.ɵɵtext(45, "Payment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "p", 28);
            i0.ɵɵtext(47, "All transactions are secure and encrypted.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 29)(49, "label", 30)(50, "input", 31);
            i0.ɵɵlistener("change", function CheckoutComponent_Template_input_change_50_listener() {
              return ctx.setPaymentMethod("card");
            });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "span", 32);
            i0.ɵɵtext(52, "Credit / Debit Card");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(53, CheckoutComponent_div_53_Template, 6, 0, "div", 33);
            i0.ɵɵelementStart(54, "label", 34)(55, "input", 35);
            i0.ɵɵlistener("change", function CheckoutComponent_Template_input_change_55_listener() {
              return ctx.setPaymentMethod("cod");
            });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 32);
            i0.ɵɵtext(57, "Cash on Delivery (COD)");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(58, "button", 36);
            i0.ɵɵtext(59, " Place Order ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "div", 37)(61, "div", 38);
            i0.ɵɵelement(62, "i", 39);
            i0.ɵɵtext(63, " Secure Checkout ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 38);
            i0.ɵɵelement(65, "i", 40);
            i0.ɵɵtext(66, " Fast Delivery ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(67, "div", 41)(68, "div", 42)(69, "h2", 43);
            i0.ɵɵtext(70, "Order Summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "div", 44);
            i0.ɵɵtemplate(72, CheckoutComponent_div_72_Template, 13, 6, "div", 45);
            i0.ɵɵpipe(73, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "div", 46)(75, "div", 47)(76, "span");
            i0.ɵɵtext(77, "Subtotal");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(78, CheckoutComponent_span_78_Template, 2, 1, "span", 48);
            i0.ɵɵpipe(79, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 47)(81, "span");
            i0.ɵɵtext(82, "Shipping");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "span");
            i0.ɵɵtext(84);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(85, "div", 49)(86, "span", 50);
            i0.ɵɵtext(87, "Total");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(88, CheckoutComponent_span_88_Template, 2, 1, "span", 51);
            i0.ɵɵpipe(89, "async");
            i0.ɵɵelementEnd()()()();
          }
          if (rf & 2) {
            i0.ɵɵadvance(49);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(15, _c0, ctx.paymentMethod === "card"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("checked", ctx.paymentMethod === "card");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.paymentMethod === "card");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c0, ctx.paymentMethod === "cod"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("checked", ctx.paymentMethod === "cod");
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(73, 9, ctx.cartItems$));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(79, 11, ctx.cartTotal$));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("", ctx.shipping, " EGP");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(89, 13, ctx.total$));
          }
        },
        dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.RouterLink, i2.AsyncPipe]
      });
    }
  }
  return CheckoutComponent;
})();