import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {

  constructor(private router: Router) {}

  onCollectionClick(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const cards = document.querySelectorAll('.collection-card');

    if (cards.length > 0) {
      gsap.to(cards, {
        y: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {

          this.router.navigate(['/category']).then(() => {
            window.scrollTo(0, 0);
          });
        }
      });
    } else {
      this.router.navigate(['/category']);
    }
  }
}
