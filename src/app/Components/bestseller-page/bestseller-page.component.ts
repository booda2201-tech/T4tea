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


    this.initAnimations();
  }

  initAnimations() {
    setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.4 }
      });


      gsap.set([".header", ".carousel-wrapper", ".footer-text"], { opacity: 0, y: 30 });
      gsap.set(".product-card", { opacity: 0, scale: 0.8, y: 50 });


      tl.to(".header", { opacity: 1, y: 0, duration: 1 })
        .to(".carousel-wrapper", { opacity: 1, y: 0, duration: 1.2 }, "-=0.6")

        .to(".product-card", {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }, "-=0.8")
        .to(".footer-text", { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    }, 200);
  }
}
