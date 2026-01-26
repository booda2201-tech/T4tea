import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
trigger('contentFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),

    trigger('buttonsFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('600ms 800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

    trigger('imageFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateX(30px)' }),
        animate('1000ms 400ms ease-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' }))
      ])
    ])
  ]
})
export class HeaderComponent{

constructor(private router: Router) {}

  onBestSellerClick() {
    // نحدد العنصر (الستارة) - يمكنك استخدام document.querySelector للسهولة هنا
    const overlay = document.querySelector('.transition-overlay');

    const tl = gsap.timeline();

    // 1. حركة إغلاق الشاشة
    tl.to(overlay, {
      duration: 0.6,
      scaleY: 1,
      ease: "power4.inOut"
    });

    // 2. الانتقال للصفحة الجديدة في منتصف الأنميشن
    tl.add(() => {
      this.router.navigate(['/bestseller-page']);
    });

    // 3. حركة فتح الشاشة في الصفحة الجديدة
    tl.to(overlay, {
      duration: 0.6,
      scaleY: 0,
      transformOrigin: "top", // تفتح للأعلى
      ease: "power4.inOut",
      delay: 0.2
    });
  }


}
