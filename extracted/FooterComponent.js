import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export let FooterComponent = /*#__PURE__*/(() => {
  class FooterComponent {
    static {
      this.ɵfac = function FooterComponent_Factory(t) {
        return new (t || FooterComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: FooterComponent,
        selectors: [["app-footer"]],
        decls: 62,
        vars: 0,
        consts: [[1, "bg-emerald", "text-cream", "pt-20", "pb-10"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-12", "mb-16"], [1, "md:col-span-1"], [1, "font-serif", "text-3xl", "text-gold", "mb-2"], [1, "text-[10px]", "uppercase", "tracking-luxe", "text-cream/70", "mb-6"], [1, "text-sm", "text-cream/70", "font-light", "leading-relaxed"], [1, "font-medium", "mb-6", "tracking-wide", "text-sm"], [1, "list-unstyled", "space-y-4", "text-sm", "text-cream/70", "font-light"], ["routerLink", "/shop", 1, "text-cream/70", "hover:text-gold", "transition-colors", "no-underline"], ["routerLink", "/teawares", 1, "text-cream/70", "hover:text-gold", "transition-colors", "no-underline"], ["routerLink", "/about", 1, "text-cream/70", "hover:text-gold", "transition-colors", "no-underline"], [1, "text-sm", "text-cream/70", "font-light", "mb-4"], [1, "flex", "border-b", "border-cream/30", "pb-2"], ["type", "email", "placeholder", "Enter your email address", 1, "bg-transparent", "border-0", "outline-none", "text-sm", "w-full", "text-cream", "placeholder:text-cream/50"], ["type", "button", 1, "btn", "btn-link", "text-gold", "hover:text-white", "transition-colors", "text-sm", "uppercase", "tracking-wider", "font-medium", "border-0", "p-0"], [1, "border-t", "border-cream/10", "pt-8", "flex", "flex-col", "md:flex-row", "justify-between", "items-center", "text-xs", "text-cream/50", "font-light"], [1, "mb-0"], [1, "flex", "space-x-6", "mt-4", "md:mt-0"], ["href", "#", 1, "text-cream/50", "hover:text-cream", "transition-colors", "no-underline"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5, "T4 TEA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7, "Unwind in Aroma");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, " Crafted from select leaves, transforming simple moments into meaningful experiences. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div")(11, "h4", 7);
            i0.ɵɵtext(12, "Shop");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "ul", 8)(14, "li")(15, "a", 9);
            i0.ɵɵtext(16, "Black Tea");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "li")(18, "a", 9);
            i0.ɵɵtext(19, "Green Tea");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "li")(21, "a", 9);
            i0.ɵɵtext(22, "Herbal Infusions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "li")(24, "a", 10);
            i0.ɵɵtext(25, "Teawares");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "li")(27, "a", 9);
            i0.ɵɵtext(28, "Gifts & Bundles");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(29, "div")(30, "h4", 7);
            i0.ɵɵtext(31, "About");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "ul", 8)(33, "li")(34, "a", 11);
            i0.ɵɵtext(35, "Our Story");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "li")(37, "a", 11);
            i0.ɵɵtext(38, "The Ritual");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "li")(40, "a", 11);
            i0.ɵɵtext(41, "Sourcing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "li")(43, "a", 11);
            i0.ɵɵtext(44, "Contact Us");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(45, "div")(46, "h4", 7);
            i0.ɵɵtext(47, "Newsletter");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p", 12);
            i0.ɵɵtext(49, " Subscribe to receive updates, access to exclusive deals, and more. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 13);
            i0.ɵɵelement(51, "input", 14);
            i0.ɵɵelementStart(52, "button", 15);
            i0.ɵɵtext(53, " Subscribe ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(54, "div", 16)(55, "p", 17);
            i0.ɵɵtext(56, "\u00A9 2026 T4 Tea. All rights reserved.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 18)(58, "a", 19);
            i0.ɵɵtext(59, "Privacy Policy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "a", 19);
            i0.ɵɵtext(61, "Terms of Service");
            i0.ɵɵelementEnd()()()()();
          }
        },
        dependencies: [i1.RouterLink]
      });
    }
  }
  return FooterComponent;
})();