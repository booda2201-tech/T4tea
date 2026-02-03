// import { Component, AfterViewInit } from '@angular/core';
// import { gsap } from 'gsap';
// import { Draggable } from 'gsap/Draggable';

// gsap.registerPlugin(Draggable);

// @Component({
//   selector: 'app-wishlist',
//   templateUrl: './wishlist.component.html',
//   styleUrls: ['./wishlist.component.scss'],
// })
// export class WishlistComponent implements AfterViewInit {
//   currentTranslate = 0;
//   cardStep = 410;
//   wishlistItems = [
//     {
//       id: 1,
//       name: 'Pomegranate',
//       description:
//         'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png',
//     },
//     {
//       id: 2,
//       name: 'Moroccan Mint',
//       description:
//         'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png',
//     },
//     {
//       id: 3,
//       name: 'Pomegranate',
//       description:
//         'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png',
//     },
//     {
//       id: 4,
//       name: 'Moroccan Mint',
//       description:
//         'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png',
//     },
//     {
//       id: 5,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 6,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 7,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 8,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 9,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 10,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 11,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 12,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 13,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 14,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 15,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 16,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 18,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 19,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 20,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 21,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//     {
//       id: 22,
//       name: 'Pomegranate',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Black Tea.png'
//     },
//     {
//       id: 23,
//       name: 'Moroccan Mint',
//       description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
//       price: 350,
//       image: '../../../assets/Green Tea.png'
//     },
//   ];

// ngAfterViewInit() {

//   gsap.set('#scrollWrapper', { x: 0 });

//   this.initDraggable();
//   this.initAnimation();
// }

//   initAnimation() {
//     gsap.from('.item-card', {
//       x: 50,
//       opacity: 0,
//       stagger: 0.1,
//       duration: 0.6,
//       ease: 'power2.out'
//     });
//   }

// initDraggable() {
//   Draggable.create('#scrollWrapper', {
//     type: 'x',
//     bounds: '#scrollContainer',
//     inertia: true,
//     onDragEnd: (instance) => {

//       this.currentTranslate = instance.x;
//     },
//     onThrowUpdate: (instance) => {

//       this.currentTranslate = instance.x;
//     },
//     onPress: function(this: any) {
//       if (this.wishlistItems.length <= 4) {
//         this.disable();
//       } else {
//         this.enable();
//       }
//     }.bind(this)
//   });
// }

// moveScroll(direction: 'left' | 'right') {
//   const wrapper = document.getElementById('scrollWrapper');
//   const container = document.getElementById('scrollContainer');

//   if (!wrapper || !container || this.wishlistItems.length <= 4) return;

//   this.currentTranslate = gsap.getProperty(wrapper, "x") as number;

//   const wrapperWidth = wrapper.scrollWidth;
//   const containerWidth = container.offsetWidth;


//   const maxScroll = -(wrapperWidth - containerWidth);

//   if (direction === 'right') {

//     this.currentTranslate = Math.max(this.currentTranslate - this.cardStep, maxScroll);
//   } else {

//     this.currentTranslate = Math.min(this.currentTranslate + this.cardStep, 0);
//   }

//   gsap.to(wrapper, {
//     x: this.currentTranslate,
//     duration: 0.6,
//     ease: 'power2.out',
//     overwrite: true
//   });
// }

//   onDelete(id: number) {
//     gsap.to(`#item-${id}`, {
//       opacity: 0,
//       scale: 0.5,
//       duration: 0.3,
//       onComplete: () => {
//         this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);

//         // إعادة التمركز لو بقوا 4 أو أقل
//         if (this.wishlistItems.length <= 4) {
//           this.currentTranslate = 0;
//           gsap.to('#scrollWrapper', { x: 0, duration: 0.5 });
//         }
//       }
//     });
//   }

//   onAddToCart(item: any) {
//     console.log('Added to cart:', item.name);
//   }
// }






import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WishlistComponent implements AfterViewInit {
  swiperInstance: Swiper | undefined;

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
    this.initSwiper();
  }

initSwiper() {
  this.swiperInstance = new Swiper('.wishlist-swiper', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 28,
      },
    },
  });
}

  onDelete(id: number) {
    gsap.to(`#item-${id}`, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);

        setTimeout(() => this.swiperInstance?.update(), 100);
      }
    });
  }

  onAddToCart(item: any) {
    console.log('Added to cart:', item.name);
  }
}
