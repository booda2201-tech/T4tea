import { Component, AfterViewInit } from '@angular/core'; // أضف AfterViewInit
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teawares',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teawares.component.html',
  styleUrls: ['./teawares.component.scss']
})
export class TeawaresComponent implements AfterViewInit {

  topProducts = [
    { name: 'Tea Cup With Handle', price: 350, img: '../../../assets/Mask group (4).png' },
    { name: 'Matcha Mixer & Wisker', price: 350, img: '../../../assets/Mask group (5).png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/Mask group (6).png' }
  ];

  bottomProducts = [
    { name: 'Matcha Wisker', price: 350, img: '../../../assets/matcha wisk 1.png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/cup 3 1.png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/cup 4 1.png' },
    { name: 'Tea Pot Red', price: 350, img: '../../../assets/bot 1.png' },
    { name: 'Tea Pot Blue', price: 350, img: '../../../assets/bot 2 1.png' },
    { name: 'Tea Pot White', price: 350, img: '../../../assets/bot 3 1.png' }
  ];

ngAfterViewInit() {
  // 1. إخفاء كل العناصر المستهدفة في البداية
  gsap.set(['.section-header', '.product-card', '.collection-banner'], {
    opacity: 0,
    y: 40
  });

  const tl = gsap.timeline();

  tl.to('.section-header', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out'
  })

  .to('.product-card', {
    opacity: 1,
    y: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: 'back.out(1.2)',
    clearProps: 'all'
  }, "-=0.4")

  .to('.collection-banner', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: 'all'
  }, "-=1")

  .to('.product-card', {
  opacity: 1,
  y: 0,
  scale: 1,
  stagger: 0.08,
  duration: 0.6,
  ease: 'back.out(1.2)',
  clearProps: 'all'
});


}



}
