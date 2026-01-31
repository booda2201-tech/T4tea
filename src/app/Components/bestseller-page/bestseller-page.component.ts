import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
// @ts-ignore
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-bestseller-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bestseller-page.component.html',
  styleUrls: ['./bestseller-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BestsellerPageComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  teaProducts: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.teaProducts = [
      { id: 1, name: 'Black Tea', img: '../../../assets/Black Tea.png' },
      { id: 2, name: 'Herbal Tea', img: '../../../assets/Herbal Tea.png' },
      { id: 3, name: 'Green Tea', img: '../../../assets/Green Tea.png' },
      { id: 4, name: 'Extra Tea', img: '../../../assets/11.png' }
    ];

    setTimeout(() => {
      if (this.swiperRef && this.swiperRef.nativeElement.swiper) {
        this.swiperRef.nativeElement.swiper.update();
      }
    }, 100);
  }

  ngAfterViewInit() {
    // 1. إعداد السوايبير
    const swiperParams = {
      slidesPerView: 1,
      navigation: false,
      pagination: false,
      breakpoints: {
        640: { slidesPerView: 1 },
        868: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    };

    Object.assign(this.swiperRef.nativeElement, swiperParams);
    this.swiperRef.nativeElement.initialize();

    // 2. تشغيل الأنميشن بعد تأكد من وجود العناصر
    this.initAnimations();
  }

  initAnimations() {
    // نستخدم setTimeout بسيط لضمان أن Angular انتهى من رندر القائمة
    setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
      });

      // تحريك الهيدر (استخدمنا الكلاس الموجود في الـ HTML فعلياً)
      if (document.querySelector('.header')) {
        tl.fromTo(".header",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0 }
        );
      }

      // تحريك حاوية السوايبير (بديلة لـ tea-row غير الموجودة)
      if (this.swiperRef) {
        tl.fromTo(this.swiperRef.nativeElement,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0 },
          "-=0.8"
        );
      }

      // تحريك الكروت والصور داخلها
      const cards = document.querySelectorAll('.product-card');
      if (cards.length > 0) {
        tl.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2 },
          "-=1"
        );
      }

      // تحريك الفوتر (النص والأقواس)
      if (document.querySelector('.footer-text')) {
        tl.fromTo(".footer-text",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1 },
          "-=0.5"
        );
      }
    }, 200);
  }
}
