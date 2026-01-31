import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      if (this.swiperRef) {
        this.swiperRef.nativeElement.swiper.update();
      }
    }, 0);
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
  }
}
