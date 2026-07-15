import gsap from 'gsap';
import { teawares } from '../../data/products';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/cart.service";
import * as i2 from "../../shared/components/footer/footer.component";
import * as i3 from "../../shared/directives/gsap-animate.directive";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
const _c0 = function (a1) {
  return ["/product", a1];
};
function TeawaresComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "a", 15);
    i0.ɵɵelement(2, "img", 16);
    i0.ɵɵelementStart(3, "button", 17);
    i0.ɵɵlistener("click", function TeawaresComponent_div_19_Template_button_click_3_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r4);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r3 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r3.toggleWishlist($event, item_r1.id));
    });
    i0.ɵɵelement(4, "i", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19)(6, "button", 20);
    i0.ɵɵlistener("click", function TeawaresComponent_div_19_Template_button_click_6_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r4);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r5 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r5.quickAdd(item_r1, $event));
    });
    i0.ɵɵtext(7, " Quick Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 21)(9, "div")(10, "a", 22)(11, "h4", 23);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "p", 24);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "span", 25);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const index_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("gsapDelay", index_r2 * 0.1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c0, item_r1.id));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", item_r1.image, i0.ɵɵsanitizeUrl)("alt", item_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bi-heart-fill", ctx_r0.isWishlisted(item_r1.id))("text-terracotta", ctx_r0.isWishlisted(item_r1.id))("text-emerald", !ctx_r0.isWishlisted(item_r1.id));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c0, item_r1.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r1.price, " EGP");
  }
}
export let TeawaresComponent = /*#__PURE__*/(() => {
  class TeawaresComponent {
    constructor(cartService) {
      this.cartService = cartService;
      this.teawares = teawares;
      this.wishlist = [];
    }
    ngOnInit() {
      gsap.from('.teawares-hero', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    toggleWishlist(event, id) {
      event.preventDefault();
      event.stopPropagation();
      this.wishlist = this.wishlist.includes(id) ? this.wishlist.filter(i => i !== id) : [...this.wishlist, id];
    }
    isWishlisted(id) {
      return this.wishlist.includes(id);
    }
    quickAdd(item, event) {
      event.preventDefault();
      event.stopPropagation();
      this.cartService.addToCart({
        id: item.id,
        name: item.title,
        type: item.type,
        price: item.price,
        image: item.image
      });
    }
    static {
      this.ɵfac = function TeawaresComponent_Factory(t) {
        return new (t || TeawaresComponent)(i0.ɵɵdirectiveInject(i1.CartService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: TeawaresComponent,
        selectors: [["app-teawares"]],
        decls: 21,
        vars: 1,
        consts: [[1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20"], [1, "pt-32", "pb-16", "bg-emerald", "relative", "overflow-hidden"], [1, "absolute", "inset-0", "opacity-30"], ["src", "https://images.unsplash.com/photo-1613336026275-d6d473084e85?q=80&w=2000&auto=format&fit=crop", "alt", "Teawares", 1, "w-full", "h-full", "object-cover"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12", "relative", "z-10", "text-center", "teawares-hero"], [1, "text-xs", "uppercase", "tracking-luxe", "text-gold", "mb-4", "block"], [1, "font-serif", "text-5xl", "md:text-6xl", "text-cream", "mb-6"], [1, "text-cream/80", "text-lg", "max-w-2xl", "mx-auto", "font-light"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12", "py-24"], [1, "text-center", "mb-16"], [1, "font-serif", "text-3xl", "text-emerald", "mb-4"], [1, "text-ink/70", "max-w-2xl", "mx-auto", "font-light"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-x-8", "gap-y-16"], ["appGsapAnimate", "fade-up", "class", "group cursor-pointer", 3, "gsapDelay", 4, "ngFor", "ngForOf"], ["appGsapAnimate", "fade-up", 1, "group", "cursor-pointer", 3, "gsapDelay"], [1, "block", "relative", "aspect-[4/5]", "bg-sand", "mb-6", "overflow-hidden", "no-underline", 3, "routerLink"], [1, "w-full", "h-full", "object-cover", "object-center", "group-hover:scale-105", "transition-transform", "duration-700", 3, "src", "alt"], ["type", "button", 1, "absolute", "top-4", "right-4", "p-2", "bg-cream/80", "backdrop-blur-sm", "rounded-full", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "hover:bg-cream", "border-0", 3, "click"], [1, "bi", "bi-heart"], [1, "absolute", "inset-0", "bg-black/10", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "flex", "items-end", "p-6", "pointer-events-none"], ["type", "button", 1, "w-full", "bg-cream", "text-emerald", "py-3", "font-medium", "tracking-wide", "hover:bg-emerald", "hover:text-cream", "transition-colors", "pointer-events-auto", "border-0", 3, "click"], [1, "flex", "justify-between", "items-start"], [1, "hover:text-mocha", "transition-colors", "no-underline", 3, "routerLink"], [1, "font-serif", "text-xl", "text-emerald", "mb-1"], [1, "text-sm", "text-mocha", "mb-0"], [1, "text-ink", "font-medium"]],
        template: function TeawaresComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-navbar");
            i0.ɵɵelementStart(2, "section", 1)(3, "div", 2);
            i0.ɵɵelement(4, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4)(6, "span", 5);
            i0.ɵɵtext(7, "The Perfect Pour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1", 6);
            i0.ɵɵtext(9, "Elegant Teawares");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, " Elevate your daily ritual with our collection of finely crafted teapots, cups, and accessories. Designed for both beauty and function. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "main", 8)(13, "div", 9)(14, "h2", 10);
            i0.ɵɵtext(15, "Craftsmanship & Ritual");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "p", 11);
            i0.ɵɵtext(17, " Every piece in our collection is selected to enhance the sensory experience of tea drinking. From the visual delight of unfurling leaves to the perfect temperature retention. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 12);
            i0.ɵɵtemplate(19, TeawaresComponent_div_19_Template, 17, 18, "div", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "app-footer");
            i0.ɵɵelementEnd();
          }
          if (rf & 2) {
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("ngForOf", ctx.teawares);
          }
        },
        dependencies: [i2.FooterComponent, i3.GsapAnimateDirective, i4.NgForOf, i5.RouterLink]
      });
    }
  }
  return TeawaresComponent;
})();