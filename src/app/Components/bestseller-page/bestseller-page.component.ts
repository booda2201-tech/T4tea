import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-bestseller-page',
  templateUrl: './bestseller-page.component.html',
  styleUrls: ['./bestseller-page.component.scss']
})
export class BestsellerPageComponent {

ngAfterViewInit() {
  // تحريك العنوان والصور عند الدخول
  gsap.from(".best-seller-content", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1, // ننتظر انتهاء الستارة
    stagger: 0.2 // العناصر تظهر واحداً تلو الآخر
  });
}

}
