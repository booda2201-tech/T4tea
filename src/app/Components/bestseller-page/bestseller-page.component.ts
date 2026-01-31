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


  setTimeout(() => {
    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.2 }
    });


    tl.fromTo(".section-header",
      { opacity: 0, y: 150 },
      { opacity: 1, y: 50 }
    );



    tl.fromTo(".tea-row",
      { opacity: 0, y: 150 },
      { opacity: 1, y: 50, stagger: 0.3, },
      "-=0.8"
    );


    tl.from(".image-wrapper img", {
      scale: 0.95,
      duration: 1.5,
      stagger: 0.3
    }, "-=1.2");

  }, 100);
}



}
