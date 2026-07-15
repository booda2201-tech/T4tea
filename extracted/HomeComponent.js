import gsap from 'gsap';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/cart.service";
import * as i2 from "../../shared/components/navbar/navbar.component";
import * as i3 from "../../shared/components/footer/footer.component";
import * as i4 from "../../shared/directives/gsap-animate.directive";
import * as i5 from "@angular/common";
import * as i6 from "@angular/router";
const _c0 = function (a1) {
  return ["/product", a1];
};
function HomeComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71)(1, "a", 72);
    i0.ɵɵelement(2, "img", 73);
    i0.ɵɵelementStart(3, "div", 74)(4, "button", 75);
    i0.ɵɵlistener("click", function HomeComponent_div_59_Template_button_click_4_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r4);
      const product_r1 = restoredCtx.$implicit;
      const ctx_r3 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r3.quickAdd(product_r1, $event));
    });
    i0.ɵɵtext(5, " Quick Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "div", 76)(7, "div")(8, "a", 77)(9, "h4", 78);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 79);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "span", 80);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const product_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    i0.ɵɵproperty("gsapDelay", i_r2 * 0.1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0, product_r1.id));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", product_r1.image, i0.ɵɵsanitizeUrl)("alt", product_r1.title);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(10, _c0, product_r1.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r1.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", product_r1.price, " EGP");
  }
}
export let HomeComponent = /*#__PURE__*/(() => {
  class HomeComponent {
    constructor(cartService) {
      this.cartService = cartService;
      this.bestSellers = [{
        id: '1',
        title: 'Pomegranate',
        type: 'Black Tea',
        price: '350',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop'
      }, {
        id: '2',
        title: 'Moroccan Mint',
        type: 'Green Tea',
        price: '350',
        image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cad?q=80&w=1000&auto=format&fit=crop'
      }, {
        id: '3',
        title: 'Spiced Chai',
        type: 'Herbal Tea',
        price: '380',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc50f160cb2?q=80&w=1000&auto=format&fit=crop'
      }];
    }
    ngOnInit() {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });
      gsap.from('.hero-image', {
        scale: 1.05,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      });
    }
    quickAdd(product, event) {
      event.preventDefault();
      event.stopPropagation();
      this.cartService.addToCart({
        id: product.id,
        name: product.title,
        type: product.type,
        price: Number(product.price),
        image: product.image
      });
    }
    static {
      this.ɵfac = function HomeComponent_Factory(t) {
        return new (t || HomeComponent)(i0.ɵɵdirectiveInject(i1.CartService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: HomeComponent,
        selectors: [["app-home"]],
        decls: 124,
        vars: 4,
        consts: [[1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20"], [1, "relative", "min-h-screen", "flex", "flex-col", "md:flex-row", "bg-cream", "pt-24", "md:pt-0"], [1, "flex-1", "flex", "flex-col", "justify-center", "px-6", "md:px-16", "lg:px-24", "py-12", "md:py-0", "z-10", "hero-text"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha", "mb-6", "block"], [1, "font-serif", "text-5xl", "md:text-6xl", "lg:text-7xl", "text-emerald", "leading-tight", "mb-6"], [1, "italic", "text-mocha"], [1, "text-ink/80", "text-lg", "md:text-xl", "max-w-md", "mb-10", "font-light", "leading-relaxed"], [1, "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "space-y-4", "sm:space-y-0", "sm:space-x-6"], ["routerLink", "/shop", 1, "bg-emerald", "text-white", "px-8", "py-4", "rounded-none", "hover:bg-emerald-soft", "transition-colors", "tracking-wide", "text-sm", "flex", "items-center", "group", "no-underline"], [1, "bi", "bi-arrow-right", "ms-2", "group-hover:translate-x-1", "transition-transform"], ["routerLink", "/about", 1, "text-ink", "border-b", "border-ink", "pb-1", "hover:text-mocha", "hover:border-mocha", "transition-colors", "tracking-wide", "text-sm", "no-underline"], [1, "flex-1", "relative", "min-h-[50vh]", "md:min-h-screen", "overflow-hidden", "hero-image"], ["src", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2000&auto=format&fit=crop", "alt", "Steaming cup of tea in elegant teaware", 1, "w-full", "h-full", "object-cover", "absolute", "inset-0"], [1, "absolute", "inset-0", "bg-gradient-to-l", "from-transparent", "to-cream/20", "md:to-cream/0"], [1, "py-24", "md:py-32", "bg-sand", "relative", "overflow-hidden"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12"], [1, "grid", "md:grid-cols-2", "gap-16", "items-center"], ["appGsapAnimate", "fade-left", 1, "relative", "h-[600px]"], ["src", "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1500&auto=format&fit=crop", "alt", "Tea preparation ritual", 1, "w-full", "h-full", "object-cover", "rounded-t-full"], [1, "absolute", "-bottom-10", "-right-10", "w-48", "h-48", "bg-cream", "rounded-full", "flex", "items-center", "justify-center", "p-8", "text-center", "shadow-xl", "hidden", "md:flex"], [1, "font-serif", "text-emerald", "italic", "text-xl", "mb-0"], ["appGsapAnimate", "fade-right", 3, "gsapDelay"], [1, "text-xs", "uppercase", "tracking-luxe", "text-terracotta", "mb-4", "block"], [1, "font-serif", "text-4xl", "md:text-5xl", "text-emerald", "mb-8"], [1, "text-ink/80", "text-lg", "mb-6", "font-light", "leading-relaxed"], [1, "text-ink/80", "text-lg", "mb-10", "font-light", "leading-relaxed"], ["routerLink", "/about", 1, "text-emerald", "border-b", "border-emerald", "pb-1", "hover:text-terracotta", "hover:border-terracotta", "transition-colors", "tracking-wide", "text-sm", "flex", "items-center", "group", "no-underline"], [1, "py-24", "bg-cream"], [1, "flex", "justify-between", "items-end", "mb-12"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha", "mb-2", "block"], [1, "font-serif", "text-4xl", "text-emerald"], ["routerLink", "/shop", 1, "hidden", "md:flex", "items-center", "text-sm", "tracking-wide", "text-emerald", "hover:text-terracotta", "transition-colors", "group", "no-underline"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-8"], ["appGsapAnimate", "fade-up", "class", "group cursor-pointer", 3, "gsapDelay", 4, "ngFor", "ngForOf"], [1, "mt-12", "text-center", "md:hidden"], ["routerLink", "/shop", 1, "inline-block", "border", "border-emerald", "text-emerald", "px-8", "py-3", "w-full", "hover:bg-emerald", "hover:text-cream", "transition-colors", "no-underline"], [1, "py-24", "bg-sand"], [1, "text-center", "mb-16"], [1, "font-serif", "text-4xl", "text-emerald", "mb-4"], [1, "text-ink/70", "max-w-2xl", "mx-auto"], [1, "grid", "grid-cols-1", "md:grid-cols-12", "gap-6", "h-auto", "md:h-[600px]"], ["appGsapAnimate", "fade-up", 1, "md:col-span-8", "relative", "group", "overflow-hidden", "cursor-pointer", "h-[400px]", "md:h-full"], ["src", "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1500&auto=format&fit=crop", "alt", "Black Tea", 1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-700"], [1, "absolute", "inset-0", "bg-black/20", "group-hover:bg-black/30", "transition-colors", "duration-300"], [1, "absolute", "bottom-8", "left-8", "text-white"], [1, "font-serif", "text-3xl", "mb-2"], [1, "text-white/80", "mb-4", "font-light"], [1, "text-sm", "tracking-wide", "border-b", "border-white", "pb-1", "inline-block"], [1, "md:col-span-4", "flex", "flex-col", "gap-6", "h-[600px]", "md:h-full"], ["appGsapAnimate", "fade-up", 1, "flex-1", "relative", "group", "overflow-hidden", "cursor-pointer", 3, "gsapDelay"], ["src", "https://images.unsplash.com/photo-1627492275512-429053422ce0?q=80&w=800&auto=format&fit=crop", "alt", "Green Tea", 1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-700"], [1, "absolute", "bottom-6", "left-6", "text-white"], [1, "font-serif", "text-2xl", "mb-1"], [1, "text-xs", "tracking-wide", "border-b", "border-white", "pb-1", "inline-block"], ["src", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop", "alt", "Herbal Infusions", 1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-700"], [1, "py-24", "bg-emerald", "text-cream", "overflow-hidden"], ["appGsapAnimate", "fade-left"], [1, "text-xs", "uppercase", "tracking-luxe", "text-gold", "mb-4", "block"], [1, "font-serif", "text-4xl", "md:text-5xl", "mb-6"], [1, "text-cream/80", "text-lg", "mb-10", "font-light", "leading-relaxed", "max-w-md"], ["routerLink", "/teawares", 1, "inline-block", "bg-gold", "text-emerald", "px-8", "py-4", "rounded-none", "hover:bg-cream", "transition-colors", "tracking-wide", "text-sm", "font-medium", "no-underline"], ["appGsapAnimate", "fade-scale", 1, "relative"], [1, "aspect-square", "bg-emerald-soft", "rounded-full", "absolute", "-inset-4", "md:-inset-10", "opacity-50", "blur-2xl"], ["src", "https://images.unsplash.com/photo-1613336026275-d6d473084e85?q=80&w=1000&auto=format&fit=crop", "alt", "Elegant Teaware", 1, "relative", "z-10", "w-full", "h-auto", "object-cover", "rounded-sm", "shadow-2xl"], [1, "py-32", "bg-cream", "relative"], [1, "absolute", "inset-0", "opacity-5", "pointer-events-none", 2, "background-image", "url('https://www.transparenttextures.com/patterns/cream-paper.png')"], [1, "max-w-3xl", "mx-auto", "px-6", "text-center", "relative", "z-10"], ["appGsapAnimate", "fade-up"], [1, "font-serif", "text-4xl", "md:text-5xl", "text-emerald", "mb-6"], [1, "text-ink/70", "text-lg", "mb-10", "font-light", "max-w-xl", "mx-auto"], ["type", "button", 1, "border", "border-emerald", "text-emerald", "px-10", "py-4", "hover:bg-emerald", "hover:text-cream", "transition-colors", "tracking-wide", "text-sm", "font-medium", "bg-transparent"], ["appGsapAnimate", "fade-up", 1, "group", "cursor-pointer", 3, "gsapDelay"], [1, "block", "relative", "aspect-[4/5]", "bg-sand", "mb-6", "overflow-hidden", "no-underline", 3, "routerLink"], [1, "w-full", "h-full", "object-cover", "object-center", "group-hover:scale-105", "transition-transform", "duration-700", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-black/10", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "flex", "items-end", "p-6"], ["type", "button", 1, "w-full", "bg-cream", "text-emerald", "py-3", "font-medium", "tracking-wide", "hover:bg-emerald", "hover:text-cream", "transition-colors", "border-0", 3, "click"], [1, "flex", "justify-between", "items-start"], [1, "hover:text-mocha", "transition-colors", "no-underline", 3, "routerLink"], [1, "font-serif", "text-xl", "text-emerald", "mb-1"], [1, "text-sm", "text-mocha", "mb-0"], [1, "text-ink", "font-medium"]],
        template: function HomeComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-navbar");
            i0.ɵɵelementStart(2, "main")(3, "section", 1)(4, "div", 2)(5, "span", 3);
            i0.ɵɵtext(6, "The Egyptian Tea Ritual");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h2", 4);
            i0.ɵɵtext(8, " From Rare Leaves ");
            i0.ɵɵelement(9, "br");
            i0.ɵɵelementStart(10, "span", 5);
            i0.ɵɵtext(11, "to Remarkable Moments.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 6);
            i0.ɵɵtext(13, " Crafted from select leaves, transforming simple moments into meaningful experiences steeped in artistry. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 7)(15, "a", 8);
            i0.ɵɵtext(16, " Explore Best Sellers ");
            i0.ɵɵelement(17, "i", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "a", 10);
            i0.ɵɵtext(19, " Discover Our Story ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 11);
            i0.ɵɵelement(21, "img", 12)(22, "div", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "section", 14)(24, "div", 15)(25, "div", 16)(26, "div", 17);
            i0.ɵɵelement(27, "img", 18);
            i0.ɵɵelementStart(28, "div", 19)(29, "p", 20);
            i0.ɵɵtext(30, " Slow down.");
            i0.ɵɵelement(31, "br");
            i0.ɵɵtext(32, "Breathe.");
            i0.ɵɵelement(33, "br");
            i0.ɵɵtext(34, "Sip. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 21)(36, "span", 22);
            i0.ɵɵtext(37, "Our Philosophy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "h3", 23);
            i0.ɵɵtext(39, "The Art of Slow Living");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "p", 24);
            i0.ɵɵtext(41, " In a world that never stops, T4 Tea is an invitation to pause. We believe that preparing and enjoying tea is not just a habit, but a grounding ritual. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "p", 25);
            i0.ɵɵtext(43, " Sourced from the finest estates and blended with Egyptian warmth, our teas offer a symphony of aroma, balance, and sophistication. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "a", 26);
            i0.ɵɵtext(45, " Read Our Story ");
            i0.ɵɵelement(46, "i", 9);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(47, "section", 27)(48, "div", 15)(49, "div", 28)(50, "div")(51, "span", 29);
            i0.ɵɵtext(52, "Curated Selection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "h3", 30);
            i0.ɵɵtext(54, "Best Sellers");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "a", 31);
            i0.ɵɵtext(56, " Shop All ");
            i0.ɵɵelement(57, "i", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 32);
            i0.ɵɵtemplate(59, HomeComponent_div_59_Template, 15, 12, "div", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 34)(61, "a", 35);
            i0.ɵɵtext(62, " Shop All ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(63, "section", 36)(64, "div", 15)(65, "div", 37)(66, "h3", 38);
            i0.ɵɵtext(67, "Our Collections");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "p", 39);
            i0.ɵɵtext(69, " Discover our thoughtfully curated blends, designed to suit every mood and moment of your day. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div", 40)(71, "div", 41);
            i0.ɵɵelement(72, "img", 42)(73, "div", 43);
            i0.ɵɵelementStart(74, "div", 44)(75, "h4", 45);
            i0.ɵɵtext(76, "Signature Black Teas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "p", 46);
            i0.ɵɵtext(78, "Bold, robust, and awakening.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 47);
            i0.ɵɵtext(80, "Explore Collection");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(81, "div", 48)(82, "div", 49);
            i0.ɵɵelement(83, "img", 50)(84, "div", 43);
            i0.ɵɵelementStart(85, "div", 51)(86, "h4", 52);
            i0.ɵɵtext(87, "Green Teas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "span", 53);
            i0.ɵɵtext(89, "Explore");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(90, "div", 49);
            i0.ɵɵelement(91, "img", 54)(92, "div", 43);
            i0.ɵɵelementStart(93, "div", 51)(94, "h4", 52);
            i0.ɵɵtext(95, "Herbal Infusions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "span", 53);
            i0.ɵɵtext(97, "Explore");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(98, "section", 55)(99, "div", 15)(100, "div", 16)(101, "div", 56)(102, "span", 57);
            i0.ɵɵtext(103, "The Perfect Pour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "h3", 58);
            i0.ɵɵtext(105, "Elegant Teawares");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "p", 59);
            i0.ɵɵtext(107, " Elevate your daily ritual with our collection of finely crafted teapots, cups, and accessories. Designed for both beauty and function. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "a", 60);
            i0.ɵɵtext(109, " Shop Accessories ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(110, "div", 61);
            i0.ɵɵelement(111, "div", 62)(112, "img", 63);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(113, "section", 64);
            i0.ɵɵelement(114, "div", 65);
            i0.ɵɵelementStart(115, "div", 66)(116, "div", 67)(117, "h3", 68);
            i0.ɵɵtext(118, "Find Your Perfect Blend");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(119, "p", 69);
            i0.ɵɵtext(120, " Not sure where to start? Take our short sensory quiz to discover the teas that perfectly match your palate and lifestyle. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "button", 70);
            i0.ɵɵtext(122, " Take the Quiz ");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelement(123, "app-footer");
            i0.ɵɵelementEnd();
          }
          if (rf & 2) {
            i0.ɵɵadvance(35);
            i0.ɵɵproperty("gsapDelay", 0.2);
            i0.ɵɵadvance(24);
            i0.ɵɵproperty("ngForOf", ctx.bestSellers);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("gsapDelay", 0.1);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("gsapDelay", 0.2);
          }
        },
        dependencies: [i2.NavbarComponent, i3.FooterComponent, i4.GsapAnimateDirective, i5.NgForOf, i6.RouterLink]
      });
    }
  }
  return HomeComponent;
})();