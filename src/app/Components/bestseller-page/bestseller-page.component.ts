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
