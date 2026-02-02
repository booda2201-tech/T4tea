import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { gsap } from 'gsap';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  constructor(private router: Router) {}

  categories = [
    {
      img: '../../../../assets/p1.png',
      title: 'Tea Cups',
      description: 'Where Comfort Meets Refinement.',
    },
    {
      img: '../../../../assets/p2.png',
      title: 'Tea Bots',
      description: 'Designed to Brew Excellence.',
    },
    {
      img: '../../../../assets/p3.png',
      title: 'Matcha Mixer',
      description: 'Savor the Essence of Matcha.',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: { items: 1 },
      740: { items: 2 },
      940: { items: 3 },
    },
    nav: false,
  };

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

onCollectionClick() {
  const cards = document.querySelectorAll('.collection-card');

  if (cards.length > 0) {
    gsap.to(cards, {
      y: -30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.router.navigate(['/teawares']).then(() => {
          console.log('Navigation successful');
        });
      }
    });
  } else {

    this.router.navigate(['/teawares']);
  }
}

}
