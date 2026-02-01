import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';


register();

interface Product {
  id: number;
  name: string;
  img: string;
  altText: string;
}

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BestSellerComponent implements OnInit, AfterViewInit {


  @ViewChild('swiperRef') swiperRef!: ElementRef;

  teaProducts: Product[] = [];
  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.teaProducts = [
      { id: 1, name: 'Rooibos Peppermint', img: '../../../../assets/Herbal Tea.png', altText: 'Herbal Tea' },
      { id: 2, name: 'Pomegranate Black Tea', img: '../../../../assets/Black Tea.png', altText: 'Black Tea' },
      { id: 3, name: 'Luscious Lavender', img: '../../../../assets/Green Tea.png', altText: 'Green Tea' },
      { id: 4, name: 'Extra Blend', img: '../../../../assets/11.png', altText: 'Extra Tea' }
    ];
  }

  ngAfterViewInit(): void {

    const swiperEl = this.swiperRef.nativeElement;
    const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        grabCursor: true,
        // pagination: false,  {clickable: false,dynamicBullets: false,},
        breakpoints: {
        768: {slidesPerView: 2,},
        1100: {
                slidesPerView: 3,
                centeredSlides: false
              }
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }


  // constructor(private api : apiService) { }


  // ngOnInit(): void {
  //   this.api.getallCategories().subscribe({
  //     next:(res:any)=>{
  //       console.log(this.categories);
  //       this.categories = res;
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }




}

