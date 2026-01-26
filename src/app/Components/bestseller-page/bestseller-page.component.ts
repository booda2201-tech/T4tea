import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-bestseller-page',
  templateUrl: './bestseller-page.component.html',
  styleUrls: ['./bestseller-page.component.scss']
})
export class BestsellerPageComponent {

ngAfterViewInit() {
  setTimeout(() => {
    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.2 }
    });

    // 1. العنوان: حركة خفيفة جداً (20px فقط) مع Fade
    tl.fromTo(".header-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0 }
    );

    // 2. الصفوف: بتظهر بالتتابع (Stagger)
    // لاحظ إننا زودنا الـ y لـ 40 عشان تبان "طالعة" لمكانها زي الفيديو
    tl.fromTo(".tea-row",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.3 },
      "-=0.8" // بيبدأ قبل ما العنوان يخلص عشان الانسيابية
    );

    // 3. حركة اختيارية للصور (لو عايزها تدخل بنعومة أكتر)
    tl.from(".image-wrapper img", {
      scale: 0.95,
      duration: 1.5,
      stagger: 0.3
    }, "-=1.2");

  }, 100);
}






}
