import gsap from 'gsap';
import { products } from '../../data/products';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/cart.service";
import * as i2 from "../../shared/components/navbar/navbar.component";
import * as i3 from "../../shared/components/footer/footer.component";
import * as i4 from "../../shared/components/filter-section/filter-section.component";
import * as i5 from "../../shared/directives/gsap-animate.directive";
import * as i6 from "@angular/common";
import * as i7 from "@angular/router";
const _c0 = function (a1) {
  return ["/product", a1];
};
function CategoryComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "a", 36);
    i0.ɵɵelement(2, "img", 37);
    i0.ɵɵelementStart(3, "button", 38);
    i0.ɵɵlistener("click", function CategoryComponent_div_48_Template_button_click_3_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r4);
      const product_r1 = restoredCtx.$implicit;
      const ctx_r3 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r3.toggleWishlist($event, product_r1.id));
    });
    i0.ɵɵelement(4, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 40)(6, "button", 41);
    i0.ɵɵlistener("click", function CategoryComponent_div_48_Template_button_click_6_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r4);
      const product_r1 = restoredCtx.$implicit;
      const ctx_r5 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r5.quickAdd(product_r1, $event));
    });
    i0.ɵɵtext(7, " Quick Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 42)(9, "div")(10, "a", 43)(11, "h4", 44);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "p", 45);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "span", 46);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const product_r1 = ctx.$implicit;
    const index_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("gsapDelay", index_r2 * 0.1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c0, product_r1.id));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", product_r1.image, i0.ɵɵsanitizeUrl)("alt", product_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bi-heart-fill", ctx_r0.isWishlisted(product_r1.id))("text-terracotta", ctx_r0.isWishlisted(product_r1.id))("text-emerald", !ctx_r0.isWishlisted(product_r1.id));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c0, product_r1.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r1.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", product_r1.price, " EGP");
  }
}
const _c1 = function () {
  return ["Black Tea", "Green Tea", "Herbal Tea", "Oolong Tea"];
};
const _c2 = function () {
  return ["Floral", "Spiced", "Citrus", "Earthy", "Minty", "Fruity"];
};
const _c3 = function () {
  return ["Calm", "Energize", "Focus", "Digest"];
};
const _c4 = function () {
  return ["None", "Low", "Medium", "High"];
};
export let CategoryComponent = /*#__PURE__*/(() => {
  class CategoryComponent {
    constructor(cartService) {
      this.cartService = cartService;
      this.products = products;
      this.isMobileFiltersOpen = false;
      this.wishlist = [];
      this.selectedFilters = [];
    }
    ngOnInit() {
      gsap.from('.category-hero', {
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
    openMobileFilters() {
      this.isMobileFiltersOpen = true;
    }
    closeMobileFilters() {
      this.isMobileFiltersOpen = false;
    }
    quickAdd(product, event) {
      event.preventDefault();
      event.stopPropagation();
      this.cartService.addToCart({
        id: product.id,
        name: product.title,
        type: product.type,
        price: product.price,
        image: product.image
      });
    }
    static {
      this.ɵfac = function CategoryComponent_Factory(t) {
        return new (t || CategoryComponent)(i0.ɵɵdirectiveInject(i1.CartService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: CategoryComponent,
        selectors: [["app-category"]],
        decls: 61,
        vars: 19,
        consts: [[1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20"], [1, "pt-32", "pb-16", "bg-sand", "relative", "overflow-hidden"], [1, "absolute", "inset-0", "opacity-20"], ["src", "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2000&auto=format&fit=crop", "alt", "Tea leaves", 1, "w-full", "h-full", "object-cover"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12", "relative", "z-10", "text-center", "category-hero"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha", "mb-4", "block"], [1, "font-serif", "text-5xl", "md:text-6xl", "text-emerald", "mb-6"], [1, "text-ink/80", "text-lg", "max-w-2xl", "mx-auto", "font-light"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12", "py-16", "flex", "flex-col", "md:flex-row", "gap-12"], [1, "md:hidden", "flex", "justify-between", "items-center", "border-b", "border-ink/10", "pb-4"], [1, "text-sm", "text-ink/60"], ["type", "button", 1, "flex", "items-center", "space-x-2", "text-sm", "font-medium", "tracking-wide", "text-emerald", "bg-transparent", "border-0", 3, "click"], [1, "bi", "bi-funnel"], [1, "fixed", "inset-0", "z-50", "bg-cream", "p-6", "overflow-y-auto", "transition-transform", "duration-300", "transform", "md:relative", "md:translate-x-0", "md:bg-transparent", "md:p-0", "md:w-64", "md:flex-shrink-0", "md:z-0", "md:block"], [1, "flex", "justify-between", "items-center", "mb-8", "md:hidden"], [1, "font-serif", "text-2xl", "text-emerald", "mb-0"], ["type", "button", 1, "btn", "btn-link", "text-ink/60", "hover:text-ink", "border-0", "p-0", 3, "click"], [1, "bi", "bi-x-lg", "text-2xl"], [1, "sticky", "top-32"], ["title", "Type", 3, "options", "selected"], ["title", "Flavor Profile", 3, "options", "selected"], ["title", "Mood", 3, "options", "selected"], ["title", "Caffeine Level", 3, "options", "selected"], [1, "flex-1"], [1, "hidden", "md:flex", "justify-between", "items-center", "mb-8"], [1, "text-sm", "text-ink/60", "font-light"], [1, "flex", "items-center", "space-x-2"], [1, "bg-transparent", "border-none", "text-sm", "font-medium", "text-emerald", "outline-none", "cursor-pointer"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-x-8", "gap-y-12"], ["appGsapAnimate", "fade-up", "class", "group cursor-pointer", 3, "gsapDelay", 4, "ngFor", "ngForOf"], [1, "mt-20", "flex", "justify-center", "items-center", "space-x-2"], ["type", "button", 1, "w-10", "h-10", "flex", "items-center", "justify-center", "border", "border-emerald", "text-emerald", "hover:bg-emerald", "hover:text-cream", "transition-colors", "text-sm", "font-medium", "bg-transparent"], ["type", "button", 1, "w-10", "h-10", "flex", "items-center", "justify-center", "border", "border-ink/20", "text-ink/60", "hover:border-emerald", "hover:text-emerald", "transition-colors", "text-sm", "font-medium", "bg-transparent"], [1, "px-2", "text-ink/40"], [1, "bi", "bi-chevron-right"], ["appGsapAnimate", "fade-up", 1, "group", "cursor-pointer", 3, "gsapDelay"], [1, "block", "relative", "aspect-[4/5]", "bg-sand", "mb-6", "overflow-hidden", "no-underline", 3, "routerLink"], [1, "w-full", "h-full", "object-cover", "object-center", "group-hover:scale-105", "transition-transform", "duration-700", 3, "src", "alt"], ["type", "button", 1, "absolute", "top-4", "right-4", "p-2", "bg-cream/80", "backdrop-blur-sm", "rounded-full", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "hover:bg-cream", "border-0", 3, "click"], [1, "bi", "bi-heart"], [1, "absolute", "inset-0", "bg-black/10", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "flex", "items-end", "p-6", "pointer-events-none"], ["type", "button", 1, "w-full", "bg-cream", "text-emerald", "py-3", "font-medium", "tracking-wide", "hover:bg-emerald", "hover:text-cream", "transition-colors", "pointer-events-auto", "border-0", 3, "click"], [1, "flex", "justify-between", "items-start"], [1, "hover:text-mocha", "transition-colors", "no-underline", 3, "routerLink"], [1, "font-serif", "text-xl", "text-emerald", "mb-1"], [1, "text-sm", "text-mocha", "mb-0"], [1, "text-ink", "font-medium"]],
        template: function CategoryComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-navbar");
            i0.ɵɵelementStart(2, "section", 1)(3, "div", 2);
            i0.ɵɵelement(4, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4)(6, "span", 5);
            i0.ɵɵtext(7, "Explore Our Blends");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1", 6);
            i0.ɵɵtext(9, "The Tea Collection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, " Discover our thoughtfully curated selection of premium teas, sourced from the finest estates and blended with Egyptian warmth. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "main", 8)(13, "div", 9)(14, "span", 10);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 11);
            i0.ɵɵlistener("click", function CategoryComponent_Template_button_click_16_listener() {
              return ctx.openMobileFilters();
            });
            i0.ɵɵelement(17, "i", 12);
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Filters");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "aside", 13)(21, "div", 14)(22, "h2", 15);
            i0.ɵɵtext(23, "Filters");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 16);
            i0.ɵɵlistener("click", function CategoryComponent_Template_button_click_24_listener() {
              return ctx.closeMobileFilters();
            });
            i0.ɵɵelement(25, "i", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 18);
            i0.ɵɵelement(27, "app-filter-section", 19)(28, "app-filter-section", 20)(29, "app-filter-section", 21)(30, "app-filter-section", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 23)(32, "div", 24)(33, "span", 25);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 26)(36, "span", 25);
            i0.ɵɵtext(37, "Sort by:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "select", 27)(39, "option");
            i0.ɵɵtext(40, "Featured");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "option");
            i0.ɵɵtext(42, "Price: Low to High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "option");
            i0.ɵɵtext(44, "Price: High to Low");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "option");
            i0.ɵɵtext(46, "Newest");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(47, "div", 28);
            i0.ɵɵtemplate(48, CategoryComponent_div_48_Template, 17, 18, "div", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 30)(50, "button", 31);
            i0.ɵɵtext(51, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "button", 32);
            i0.ɵɵtext(53, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "button", 32);
            i0.ɵɵtext(55, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 33);
            i0.ɵɵtext(57, "...");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "button", 32);
            i0.ɵɵelement(59, "i", 34);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(60, "app-footer");
            i0.ɵɵelementEnd();
          }
          if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate1("", ctx.products.length, " Products");
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("-translate-x-full", !ctx.isMobileFiltersOpen)("translate-x-0", ctx.isMobileFiltersOpen);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("options", i0.ɵɵpureFunction0(15, _c1))("selected", ctx.selectedFilters);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("options", i0.ɵɵpureFunction0(16, _c2))("selected", ctx.selectedFilters);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("options", i0.ɵɵpureFunction0(17, _c3))("selected", ctx.selectedFilters);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("options", i0.ɵɵpureFunction0(18, _c4))("selected", ctx.selectedFilters);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.products.length, " Products");
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.products);
          }
        },
        dependencies: [i2.NavbarComponent, i3.FooterComponent, i4.FilterSectionComponent, i5.GsapAnimateDirective, i6.NgForOf, i7.RouterLink]
      });
    }
  }
  return CategoryComponent;
})();