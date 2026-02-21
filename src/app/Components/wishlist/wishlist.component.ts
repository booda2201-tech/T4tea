

import { Component, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { gsap } from 'gsap';
import Swiper from 'swiper';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WishlistComponent implements AfterViewInit {
  swiperInstance: Swiper | undefined;

  constructor(private cdr: ChangeDetectorRef) {} // مهم جداً للتنقل بين التصميمين

  wishlistItems = [
    {
      id: 1,
      name: 'Pomegranate',
      description:
        'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png',
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description:
        'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png',
    },
    {
      id: 3,
      name: 'Pomegranate',
      description:
        'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png',
    },
    {
      id: 4,
      name: 'Moroccan Mint',
      description:
        'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png',
    },
    {
      id: 5,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 6,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 7,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 8,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 9,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 10,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 11,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 12,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 13,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 14,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 15,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 16,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 18,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 19,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 20,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 21,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 22,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 23,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
  ];

  ngAfterViewInit() {
    this.playEntranceAnimation();
    if (this.wishlistItems.length > 2) {
      this.initSwiper();
    }
  }

  initSwiper() {
    this.swiperInstance = new Swiper('.wishlist-swiper', {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      grabCursor: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },

      breakpoints: {

        0: {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: false,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 25,
          centeredSlides: false,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: false,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 30,
          centeredSlides: false,
        },
      },
    });
  }
  onDelete(id: number) {

    gsap.to(`#item-${id}`, {
      opacity: 0,
      scale: 0.2,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);


        this.cdr.detectChanges();

        if (this.wishlistItems.length > 2) {
          this.swiperInstance?.update();
        } else {

          this.playWideLayoutAnimation();
        }
      }
    });
  }

  playWideLayoutAnimation() {
    setTimeout(() => {
      gsap.from('.wide-card', {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, 50);
  }

  playEntranceAnimation() {
  setTimeout(() => {
    gsap.from('.section-header', {
      y: -130,
      x: 650,
      opacity: 1.55,
      duration: 0.8,
      ease: 'power5.out'
    });


    gsap.from('.item-card', {
      y: 60,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
          clearProps: "all",
          force3D: true
        });


    gsap.from('.nav-arrow', {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          delay: 0.5,
          onComplete: () => {
            gsap.set('.nav-arrow', { opacity: 1, visibility: 'visible', clearProps: 'all' });
          }
        });
      }, 100);
  }

  trackByFn(index: number, item: any) { return item.id; }
  onAddToCart(item: any) { console.log('Added:', item.name); }
}
