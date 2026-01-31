/* header.component.ts */
import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  constructor(private router: Router, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.startEntranceAnimation();
  }

  private startEntranceAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });

    // تصفير القيم (إزاحة لأسفل بـ 100 بكسل)
    gsap.set(".hero-title", { y: 120, opacity: 0 });
    gsap.set(".btn", { y: 40, opacity: 0 });

    // تشغيل الأنميشن بالترتيب
    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        stagger: 0.2, // الفرق الزمني بين السطر الأول والثاني
        delay: 0.4
      })
      .to(".btn", {
        y: 0,
        opacity: 1,
        stagger: 0.15
      }, "-=1"); // يبدأ الأزرار قبل انتهاء العنوان بـ ثانية واحدة
  }

  private exitTo(path: string) {
    gsap.to(".hero-text-part", {
      opacity: 0,
      y: -40,
      duration: 0.7,
      ease: "expo.in",
      onComplete: () => {
        this.ngZone.run(() => this.router.navigate([path]));
      }
    });
  }

  onExploreClick() { this.exitTo('/explore-page'); }
  onBestSellerClick() { this.exitTo('/bestseller-page'); }
}
