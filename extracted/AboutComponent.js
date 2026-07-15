import gsap from 'gsap';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/components/footer/footer.component";
import * as i2 from "../../shared/directives/gsap-animate.directive";
export let AboutComponent = /*#__PURE__*/(() => {
  class AboutComponent {
    ngOnInit() {
      gsap.from('.about-hero', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    static {
      this.ɵfac = function AboutComponent_Factory(t) {
        return new (t || AboutComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: AboutComponent,
        selectors: [["app-about"]],
        decls: 58,
        vars: 3,
        consts: [[1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20"], [1, "pt-32", "pb-24", "relative", "overflow-hidden"], [1, "max-w-4xl", "mx-auto", "px-6", "text-center", "about-hero"], [1, "text-xs", "uppercase", "tracking-luxe", "text-terracotta", "mb-6", "block"], [1, "font-serif", "text-5xl", "md:text-7xl", "text-emerald", "mb-8", "leading-tight"], [1, "italic", "text-mocha"], [1, "text-ink/80", "text-lg", "md:text-xl", "font-light", "leading-relaxed"], [1, "py-12"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12"], [1, "grid", "md:grid-cols-2", "gap-8", "h-[600px]"], ["appGsapAnimate", "fade-left", 1, "bg-sand", "overflow-hidden"], ["src", "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1500&auto=format&fit=crop", "alt", "Tea leaves", 1, "w-full", "h-full", "object-cover"], ["appGsapAnimate", "fade-right", 1, "bg-sand", "overflow-hidden", 3, "gsapDelay"], ["src", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1500&auto=format&fit=crop", "alt", "Tea preparation", 1, "w-full", "h-full", "object-cover"], [1, "py-24", "bg-sand"], [1, "max-w-3xl", "mx-auto", "px-6", "text-center"], [1, "text-xs", "uppercase", "tracking-luxe", "text-emerald", "mb-4", "block"], [1, "font-serif", "text-4xl", "text-emerald", "mb-8"], [1, "text-ink/80", "text-lg", "font-light", "leading-relaxed", "mb-6"], [1, "text-ink/80", "text-lg", "font-light", "leading-relaxed"], [1, "py-24"], [1, "grid", "md:grid-cols-3", "gap-16"], ["appGsapAnimate", "fade-up", 1, "text-center"], [1, "w-16", "h-16", "mx-auto", "border", "border-emerald", "rounded-full", "flex", "items-center", "justify-center", "mb-6", "text-emerald"], [1, "font-serif", "text-2xl"], [1, "font-serif", "text-2xl", "text-emerald", "mb-4"], [1, "text-ink/70", "font-light", "text-sm", "leading-relaxed"], ["appGsapAnimate", "fade-up", 1, "text-center", 3, "gsapDelay"]],
        template: function AboutComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-navbar");
            i0.ɵɵelementStart(2, "section", 1)(3, "div", 2)(4, "span", 3);
            i0.ɵɵtext(5, "Our Story");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 4);
            i0.ɵɵtext(7, " Crafting the ");
            i0.ɵɵelement(8, "br");
            i0.ɵɵelementStart(9, "span", 5);
            i0.ɵɵtext(10, "Egyptian Tea Ritual");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p", 6);
            i0.ɵɵtext(12, " T4 Tea was born from a desire to elevate the everyday act of drinking tea into a moment of profound connection and quiet luxury. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "section", 7)(14, "div", 8)(15, "div", 9)(16, "div", 10);
            i0.ɵɵelement(17, "img", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 12);
            i0.ɵɵelement(19, "img", 13);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(20, "section", 14)(21, "div", 15)(22, "span", 16);
            i0.ɵɵtext(23, "Our Philosophy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "h2", 17);
            i0.ɵɵtext(25, "Slow Living in Every Sip");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p", 18);
            i0.ɵɵtext(27, " In a fast-paced world, we believe in the power of the pause. The Egyptian tea ritual is not just about the beverage; it is about the time taken to prepare it, the aroma that fills the room, and the warmth of the cup in your hands. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "p", 19);
            i0.ɵɵtext(29, " We source only the finest leaves from sustainable estates, blending them with care to create symphonies of flavor that honor both tradition and modern refinement. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "section", 20)(31, "div", 8)(32, "div", 21)(33, "div", 22)(34, "div", 23)(35, "span", 24);
            i0.ɵɵtext(36, "01");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "h3", 25);
            i0.ɵɵtext(38, "Aroma");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "p", 26);
            i0.ɵɵtext(40, " The first encounter. We meticulously preserve the essential oils of our leaves to ensure a captivating fragrance. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 27)(42, "div", 23)(43, "span", 24);
            i0.ɵɵtext(44, "02");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "h3", 25);
            i0.ɵɵtext(46, "Balance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "p", 26);
            i0.ɵɵtext(48, " The perfect harmony of flavor notes. Neither too astringent nor too mild, crafted for a smooth, lingering finish. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "div", 27)(50, "div", 23)(51, "span", 24);
            i0.ɵɵtext(52, "03");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "h3", 25);
            i0.ɵɵtext(54, "Artistry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "p", 26);
            i0.ɵɵtext(56, " From the hand-plucked leaves to the elegant teawares, every element is chosen with an eye for beauty and craft. ");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelement(57, "app-footer");
            i0.ɵɵelementEnd();
          }
          if (rf & 2) {
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("gsapDelay", 0.2);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("gsapDelay", 0.2);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("gsapDelay", 0.4);
          }
        },
        dependencies: [i1.FooterComponent, i2.GsapAnimateDirective]
      });
    }
  }
  return AboutComponent;
})();