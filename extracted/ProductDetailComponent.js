import gsap from 'gsap';
import { products, teawares } from '../../data/products';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../core/services/cart.service";
import * as i3 from "../../shared/components/navbar/navbar.component";
import * as i4 from "../../shared/components/footer/footer.component";
import * as i5 from "../../shared/directives/gsap-animate.directive";
import * as i6 from "@angular/common";
function ProductDetailComponent_div_0_div_24_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵelement(1, "img", 76);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("border-emerald", i_r10 === 1)("border-transparent", i_r10 !== 1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", ctx_r1.product.image, i0.ɵɵsanitizeUrl)("alt", ctx_r1.product.title + " view " + i_r10);
  }
}
function ProductDetailComponent_div_0_i_30_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "i", 77);
  }
}
function ProductDetailComponent_div_0_span_66_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "span", 78);
  }
}
function ProductDetailComponent_div_0_span_69_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "span", 78);
  }
}
function ProductDetailComponent_div_0_div_71_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 80)(2, "div")(3, "span", 81);
    i0.ɵɵtext(4, "Aroma");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 82);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 83)(8, "span", 81);
    i0.ɵɵtext(9, "Taste Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 82);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r5.product.aroma);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r5.product.tasteNotes);
  }
}
function ProductDetailComponent_div_0_div_72_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85);
    i0.ɵɵelement(2, "i", 86);
    i0.ɵɵelementStart(3, "span", 81);
    i0.ɵɵtext(4, "Temp");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 82);
    i0.ɵɵtext(6, "90\u00B0C / 195\u00B0F");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 85);
    i0.ɵɵelement(8, "i", 87);
    i0.ɵɵelementStart(9, "span", 81);
    i0.ɵɵtext(10, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 82);
    i0.ɵɵtext(12, "2.5g / 1 tsp");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 85);
    i0.ɵɵelement(14, "i", 88);
    i0.ɵɵelementStart(15, "span", 81);
    i0.ɵɵtext(16, "Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 82);
    i0.ɵɵtext(18, "3-4 mins");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 85);
    i0.ɵɵelement(20, "i", 89);
    i0.ɵɵelementStart(21, "span", 81);
    i0.ɵɵtext(22, "Servings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p", 82);
    i0.ɵɵtext(24, "Multiple infusions");
    i0.ɵɵelementEnd()()();
  }
}
const _c0 = function (a1) {
  return ["/product", a1];
};
function ProductDetailComponent_div_0_div_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 90)(1, "a", 91);
    i0.ɵɵelement(2, "img", 92);
    i0.ɵɵelementStart(3, "div", 93)(4, "button", 94);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_div_98_Template_button_click_4_listener($event) {
      const restoredCtx = i0.ɵɵrestoreView(_r15);
      const p_r12 = restoredCtx.$implicit;
      const ctx_r14 = i0.ɵɵnextContext(2);
      return i0.ɵɵresetView(ctx_r14.quickAdd(p_r12, $event));
    });
    i0.ɵɵtext(5, " Quick Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "div", 95)(7, "div")(8, "a", 96)(9, "h4", 97);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 98);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "span", 99);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const p_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    i0.ɵɵproperty("gsapDelay", i_r13 * 0.1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0, p_r12.id));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", p_r12.image, i0.ɵɵsanitizeUrl)("alt", p_r12.title);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(10, _c0, p_r12.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r12.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r12.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", p_r12.price, " EGP");
  }
}
function ProductDetailComponent_div_0_i_104_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "i", 100);
  }
}
function ProductDetailComponent_div_0_div_108_i_11_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "i", 115);
  }
}
const _c1 = function () {
  return [1, 2, 3, 4, 5];
};
function ProductDetailComponent_div_0_div_108_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101)(1, "div", 102)(2, "div", 103)(3, "div", 104);
    i0.ɵɵelement(4, "img", 105);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h5", 106);
    i0.ɵɵtext(7, "Sarah M.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 107);
    i0.ɵɵtext(9, "Verified Buyer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 108);
    i0.ɵɵtemplate(11, ProductDetailComponent_div_0_div_108_i_11_Template, 1, 0, "i", 109);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "h6", 110);
    i0.ɵɵtext(13, "Absolutely wonderful");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 111);
    i0.ɵɵtext(15, " This tea has become a staple in my morning routine. The aroma is incredible and the taste is perfectly balanced. Highly recommend! ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 112)(17, "div", 113);
    i0.ɵɵelement(18, "img", 114);
    i0.ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const review_r17 = ctx.$implicit;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", "https://i.pravatar.cc/150?img=" + (review_r17 + 10), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(3, _c1));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("src", ctx_r9.product.image, i0.ɵɵsanitizeUrl);
  }
}
const _c2 = function () {
  return [1, 2, 3, 4];
};
const _c3 = function (a0, a1, a2, a3) {
  return {
    "bg-terracotta/5": a0,
    "text-terracotta": a1,
    "border-ink/20": a2,
    "text-ink/60": a3
  };
};
const _c4 = function (a0) {
  return {
    "text-ink/50": a0
  };
};
const _c5 = function () {
  return [1, 2];
};
function ProductDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "app-navbar");
    i0.ɵɵelementStart(2, "main", 2)(3, "div", 3)(4, "div", 4)(5, "a", 5);
    i0.ɵɵtext(6, "Home");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "/");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "a", 6);
    i0.ɵɵtext(10, "Shop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "/");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 7);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 8)(16, "div", 9)(17, "div", 10);
    i0.ɵɵelement(18, "img", 11);
    i0.ɵɵelementStart(19, "button", 12);
    i0.ɵɵelement(20, "i", 13);
    i0.ɵɵelementStart(21, "span", 14);
    i0.ɵɵtext(22, "360\u00B0 View");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 15);
    i0.ɵɵtemplate(24, ProductDetailComponent_div_0_div_24_Template, 2, 6, "div", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 17)(26, "div", 18)(27, "span", 19);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 20);
    i0.ɵɵtemplate(30, ProductDetailComponent_div_0_i_30_Template, 1, 0, "i", 21);
    i0.ɵɵelementStart(31, "span", 22);
    i0.ɵɵtext(32, "(128)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "h1", 23);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 24);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "p", 25);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 26)(40, "div", 27);
    i0.ɵɵelement(41, "span", 28);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 27);
    i0.ɵɵelement(44, "span", 29);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 27);
    i0.ɵɵelement(47, "span", 30);
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(49, "div", 31);
    i0.ɵɵelementStart(50, "div", 32)(51, "div", 33)(52, "button", 34);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_52_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r20 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r20.decreaseQuantity());
    });
    i0.ɵɵelement(53, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "span", 36);
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "button", 34);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_56_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r22 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r22.increaseQuantity());
    });
    i0.ɵɵelement(57, "i", 37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "button", 38);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_58_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r23 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r23.addToCart());
    });
    i0.ɵɵtext(59, " Add to Cart ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "button", 39);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_60_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r24 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r24.toggleWishlist());
    });
    i0.ɵɵelement(61, "i", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "div")(63, "div", 41)(64, "button", 42);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_64_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r25 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r25.setActiveTab("description"));
    });
    i0.ɵɵtext(65, " Sensory Notes ");
    i0.ɵɵtemplate(66, ProductDetailComponent_div_0_span_66_Template, 1, 0, "span", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "button", 42);
    i0.ɵɵlistener("click", function ProductDetailComponent_div_0_Template_button_click_67_listener() {
      i0.ɵɵrestoreView(_r21);
      const ctx_r26 = i0.ɵɵnextContext();
      return i0.ɵɵresetView(ctx_r26.setActiveTab("brewing"));
    });
    i0.ɵɵtext(68, " Brewing Guide ");
    i0.ɵɵtemplate(69, ProductDetailComponent_div_0_span_69_Template, 1, 0, "span", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 44);
    i0.ɵɵtemplate(71, ProductDetailComponent_div_0_div_71_Template, 12, 2, "div", 45);
    i0.ɵɵtemplate(72, ProductDetailComponent_div_0_div_72_Template, 25, 0, "div", 46);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(73, "section", 47)(74, "div", 48)(75, "div", 49)(76, "span", 50);
    i0.ɵɵtext(77, "Perfect Pairing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "h3", 51);
    i0.ɵɵtext(79, "The Ritual Bundle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "p", 52);
    i0.ɵɵtext(81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "button", 53);
    i0.ɵɵtext(83);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(84, "div", 54)(85, "div", 55);
    i0.ɵɵelement(86, "img", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(87, "i", 57);
    i0.ɵɵelementStart(88, "div", 58);
    i0.ɵɵelement(89, "img", 56);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(90, "section", 59)(91, "div", 60)(92, "h3", 61);
    i0.ɵɵtext(93, "You May Also Like");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "a", 62);
    i0.ɵɵtext(95, " View All ");
    i0.ɵɵelement(96, "i", 63);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "div", 64);
    i0.ɵɵtemplate(98, ProductDetailComponent_div_0_div_98_Template, 15, 12, "div", 65);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(99, "section", 66)(100, "div", 67)(101, "h3", 68);
    i0.ɵɵtext(102, "Customer Reviews");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "div", 69);
    i0.ɵɵtemplate(104, ProductDetailComponent_div_0_i_104_Template, 1, 0, "i", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "p", 71);
    i0.ɵɵtext(106, "Based on 128 reviews");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(107, "div", 72);
    i0.ɵɵtemplate(108, ProductDetailComponent_div_0_div_108_Template, 19, 4, "div", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(109, "div", 74)(110, "button", 53);
    i0.ɵɵtext(111, " Load More Reviews ");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelement(112, "app-footer");
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r0.product.title);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", ctx_r0.product.image, i0.ɵɵsanitizeUrl)("alt", ctx_r0.product.title);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(38, _c2));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.product.type);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(39, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.product.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.product.price, " EGP");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.product.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r0.product.flavorProfile, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r0.product.mood, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Caffeine: ", ctx_r0.product.caffeine, " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r0.quantity);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("border-terracotta", ctx_r0.isWishlisted);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction4(40, _c3, ctx_r0.isWishlisted, ctx_r0.isWishlisted, !ctx_r0.isWishlisted, !ctx_r0.isWishlisted));
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("bi-heart-fill", ctx_r0.isWishlisted);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("text-emerald", ctx_r0.activeTab === "description");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(45, _c4, ctx_r0.activeTab !== "description"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.activeTab === "description");
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("text-emerald", ctx_r0.activeTab === "brewing");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(47, _c4, ctx_r0.activeTab !== "brewing"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.activeTab === "brewing");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.activeTab === "description");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.activeTab === "brewing");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate2(" Enhance your experience by pairing ", ctx_r0.product.title, " with our ", ctx_r0.bundleTeaware.title, ". Designed to bring out the delicate notes of this specific blend. ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Add Bundle - ", ctx_r0.bundlePrice, " EGP ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r0.product.image, i0.ɵɵsanitizeUrl)("alt", ctx_r0.product.title);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r0.bundleTeaware.image, i0.ɵɵsanitizeUrl)("alt", ctx_r0.bundleTeaware.title);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r0.relatedProducts);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(49, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(50, _c5));
  }
}
export let ProductDetailComponent = /*#__PURE__*/(() => {
  class ProductDetailComponent {
    constructor(route, cartService) {
      this.route = route;
      this.cartService = cartService;
      this.relatedProducts = [];
      this.quantity = 1;
      this.activeTab = 'description';
      this.isWishlisted = false;
    }
    ngOnInit() {
      this.routeSub = this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.product = products.find(p => p.id === id) || products[1];
        this.relatedProducts = products.filter(p => p.id !== this.product.id).slice(0, 3);
        this.bundleTeaware = teawares[0];
        this.quantity = 1;
        window.scrollTo(0, 0);
        gsap.from('.product-image', {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out'
        });
        gsap.from('.product-info', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out'
        });
      });
    }
    ngOnDestroy() {
      this.routeSub?.unsubscribe();
    }
    setActiveTab(tab) {
      this.activeTab = tab;
    }
    decreaseQuantity() {
      this.quantity = Math.max(1, this.quantity - 1);
    }
    increaseQuantity() {
      this.quantity += 1;
    }
    toggleWishlist() {
      this.isWishlisted = !this.isWishlisted;
    }
    addToCart() {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.title,
        type: this.product.type,
        price: this.product.price,
        image: this.product.image
      }, this.quantity);
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
    get bundlePrice() {
      return this.product.price + this.bundleTeaware.price - 50;
    }
    static {
      this.ɵfac = function ProductDetailComponent_Factory(t) {
        return new (t || ProductDetailComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CartService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/i0.ɵɵdefineComponent({
        type: ProductDetailComponent,
        selectors: [["app-product-detail"]],
        decls: 1,
        vars: 1,
        consts: [["class", "min-h-screen bg-cream font-sans text-ink selection:bg-emerald/20", 4, "ngIf"], [1, "min-h-screen", "bg-cream", "font-sans", "text-ink", "selection:bg-emerald/20"], [1, "pt-32", "pb-24"], [1, "max-w-7xl", "mx-auto", "px-6", "md:px-12"], [1, "flex", "items-center", "space-x-2", "text-xs", "text-ink/60", "mb-8", "font-light", "tracking-wide"], ["routerLink", "/", 1, "hover:text-emerald", "transition-colors", "no-underline", "text-inherit"], ["routerLink", "/shop", 1, "hover:text-emerald", "transition-colors", "no-underline", "text-inherit"], [1, "text-emerald"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-16", "lg:gap-24", "mb-24"], [1, "space-y-6"], [1, "relative", "aspect-[4/5]", "bg-sand", "overflow-hidden", "group", "cursor-zoom-in", "product-image"], [1, "w-full", "h-full", "object-cover", "transition-transform", "duration-700", "group-hover:scale-110", 3, "src", "alt"], ["type", "button", 1, "absolute", "bottom-6", "right-6", "bg-cream/80", "backdrop-blur-sm", "p-3", "rounded-full", "text-emerald", "hover:bg-cream", "transition-colors", "flex", "items-center", "space-x-2", "border-0"], [1, "bi", "bi-play-fill", "text-emerald"], [1, "text-xs", "font-medium", "tracking-wide", "pe-1"], [1, "grid", "grid-cols-4", "gap-4"], ["class", "aspect-square bg-sand overflow-hidden cursor-pointer border-2 transition-colors hover:border-emerald/30", 3, "border-emerald", "border-transparent", 4, "ngFor", "ngForOf"], [1, "flex", "flex-col", "justify-center", "product-info"], [1, "flex", "justify-between", "items-start", "mb-2"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha"], [1, "flex", "items-center", "space-x-1", "text-gold"], ["class", "bi bi-star-fill text-sm", 4, "ngFor", "ngForOf"], [1, "text-xs", "text-ink/60", "font-light", "ms-2"], [1, "font-serif", "text-4xl", "md:text-5xl", "lg:text-6xl", "text-emerald", "mb-4", "leading-tight"], [1, "text-2xl", "text-ink", "mb-8", "font-medium"], [1, "text-ink/80", "text-lg", "font-light", "leading-relaxed", "mb-8"], [1, "flex", "flex-wrap", "gap-3", "mb-10"], [1, "border", "border-ink/10", "px-4", "py-2", "text-sm", "text-ink/70", "font-light", "flex", "items-center"], [1, "w-2", "h-2", "rounded-full", "bg-terracotta", "me-2"], [1, "w-2", "h-2", "rounded-full", "bg-gold", "me-2"], [1, "w-2", "h-2", "rounded-full", "bg-emerald", "me-2"], [1, "h-px", "w-full", "bg-ink/10", "mb-10"], [1, "flex", "items-center", "space-x-6", "mb-12"], [1, "flex", "items-center", "border", "border-emerald", "h-14"], ["type", "button", 1, "px-4", "h-full", "text-emerald", "hover:bg-emerald/5", "transition-colors", "border-0", "bg-transparent", 3, "click"], [1, "bi", "bi-dash"], [1, "w-12", "text-center", "font-medium", "text-emerald"], [1, "bi", "bi-plus"], ["type", "button", 1, "flex-1", "bg-emerald", "text-cream", "h-14", "font-medium", "tracking-wide", "hover:bg-gold", "hover:text-emerald", "transition-colors", "border-0", 3, "click"], ["type", "button", 1, "h-14", "w-14", "border", "flex", "items-center", "justify-center", "transition-colors", "bg-transparent", 3, "ngClass", "click"], [1, "bi", "bi-heart"], [1, "flex", "space-x-8", "border-b", "border-ink/10", "mb-6"], ["type", "button", 1, "pb-4", "text-sm", "font-medium", "tracking-wide", "transition-colors", "relative", "border-0", "bg-transparent", 3, "ngClass", "click"], ["class", "absolute bottom-0 left-0 right-0 h-0.5 bg-emerald", 4, "ngIf"], [1, "min-h-[150px]"], ["class", "space-y-4", 4, "ngIf"], ["class", "grid grid-cols-2 md:grid-cols-4 gap-6", 4, "ngIf"], [1, "mb-24", "bg-emerald/5", "p-8", "md:p-12", "border", "border-emerald/10"], [1, "flex", "flex-col", "md:flex-row", "items-center", "gap-12"], [1, "flex-1", "text-center", "md:text-left"], [1, "text-xs", "uppercase", "tracking-luxe", "text-terracotta", "mb-4", "block"], [1, "font-serif", "text-3xl", "text-emerald", "mb-4"], [1, "text-ink/70", "font-light", "mb-6", "max-w-md"], ["type", "button", 1, "border", "border-emerald", "text-emerald", "px-8", "py-3", "hover:bg-emerald", "hover:text-cream", "transition-colors", "text-sm", "font-medium", "tracking-wide", "bg-transparent"], [1, "flex-1", "flex", "items-center", "justify-center", "gap-4"], [1, "w-32", "h-40", "bg-sand", "overflow-hidden", "shadow-lg"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "bi", "bi-plus", "text-2xl", "text-emerald/30"], [1, "w-40", "h-48", "bg-sand", "overflow-hidden", "shadow-lg"], [1, "mb-24"], [1, "flex", "justify-between", "items-end", "mb-12"], [1, "font-serif", "text-4xl", "text-emerald"], ["routerLink", "/shop", 1, "hidden", "md:flex", "items-center", "text-sm", "tracking-wide", "text-emerald", "hover:text-terracotta", "transition-colors", "group", "no-underline"], [1, "bi", "bi-arrow-right", "ms-2", "group-hover:translate-x-1", "transition-transform"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-8"], ["appGsapAnimate", "fade-up", "class", "group cursor-pointer", 3, "gsapDelay", 4, "ngFor", "ngForOf"], [1, "border-t", "border-ink/10", "pt-24"], [1, "text-center", "mb-16"], [1, "font-serif", "text-4xl", "text-emerald", "mb-4"], [1, "flex", "items-center", "justify-center", "space-x-2", "mb-2"], ["class", "bi bi-star-fill text-gold text-xl", 4, "ngFor", "ngForOf"], [1, "text-ink/70", "font-light"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-12"], ["class", "bg-cream p-8 border border-ink/5", 4, "ngFor", "ngForOf"], [1, "text-center", "mt-12"], [1, "aspect-square", "bg-sand", "overflow-hidden", "cursor-pointer", "border-2", "transition-colors", "hover:border-emerald/30"], [1, "w-full", "h-full", "object-cover", "opacity-80", "hover:opacity-100", "transition-opacity", 3, "src", "alt"], [1, "bi", "bi-star-fill", "text-sm"], [1, "absolute", "bottom-0", "left-0", "right-0", "h-0.5", "bg-emerald"], [1, "space-y-4"], [1, "grid", "grid-cols-3", "gap-4"], [1, "text-xs", "uppercase", "tracking-luxe", "text-mocha", "block", "mb-1"], [1, "text-sm", "text-ink/80", "font-light", "mb-0"], [1, "col-span-2"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-6"], [1, "text-center"], [1, "bi", "bi-thermometer-half", "text-2xl", "text-emerald", "mb-3", "d-block"], [1, "bi", "bi-droplet", "text-2xl", "text-emerald", "mb-3", "d-block"], [1, "bi", "bi-clock", "text-2xl", "text-emerald", "mb-3", "d-block"], [1, "bi", "bi-cup-hot", "text-2xl", "text-emerald", "mb-3", "d-block"], ["appGsapAnimate", "fade-up", 1, "group", "cursor-pointer", 3, "gsapDelay"], [1, "block", "relative", "aspect-[4/5]", "bg-sand", "mb-6", "overflow-hidden", "no-underline", 3, "routerLink"], [1, "w-full", "h-full", "object-cover", "object-center", "group-hover:scale-105", "transition-transform", "duration-700", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-black/10", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "flex", "items-end", "p-6", "pointer-events-none"], ["type", "button", 1, "w-full", "bg-cream", "text-emerald", "py-3", "font-medium", "tracking-wide", "hover:bg-emerald", "hover:text-cream", "transition-colors", "pointer-events-auto", "border-0", 3, "click"], [1, "flex", "justify-between", "items-start"], [1, "hover:text-mocha", "transition-colors", "no-underline", 3, "routerLink"], [1, "font-serif", "text-xl", "text-emerald", "mb-1"], [1, "text-sm", "text-mocha", "mb-0"], [1, "text-ink", "font-medium"], [1, "bi", "bi-star-fill", "text-gold", "text-xl"], [1, "bg-cream", "p-8", "border", "border-ink/5"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "flex", "items-center", "space-x-4"], [1, "w-12", "h-12", "bg-sand", "rounded-full", "overflow-hidden"], ["alt", "Avatar", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "font-medium", "text-emerald", "mb-0"], [1, "text-xs", "text-ink/50"], [1, "flex", "space-x-1"], ["class", "bi bi-star-fill text-gold text-xs", 4, "ngFor", "ngForOf"], [1, "font-serif", "text-lg", "text-emerald", "mb-2"], [1, "text-ink/70", "font-light", "text-sm", "leading-relaxed", "mb-4"], [1, "flex", "space-x-2"], [1, "w-20", "h-20", "bg-sand", "overflow-hidden", "cursor-pointer"], ["alt", "Customer photo", 1, "w-full", "h-full", "object-cover", "opacity-80", "hover:opacity-100", "transition-opacity", 3, "src"], [1, "bi", "bi-star-fill", "text-gold", "text-xs"]],
        template: function ProductDetailComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵtemplate(0, ProductDetailComponent_div_0_Template, 113, 51, "div", 0);
          }
          if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.product);
          }
        },
        dependencies: [i3.NavbarComponent, i4.FooterComponent, i5.GsapAnimateDirective, i6.NgClass, i6.NgForOf, i6.NgIf, i1.RouterLink]
      });
    }
  }
  return ProductDetailComponent;
})();