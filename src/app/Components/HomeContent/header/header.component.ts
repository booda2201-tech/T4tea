import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  constructor(private router: Router, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.startEntranceAnimation();
  }


  private startEntranceAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });


    gsap.set(".hero-title", { y: 100, opacity: 0 });
    gsap.set(".btn", { y: 40, opacity: 0 });


    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        delay: 0.3
      })
      .to(".btn", {
        y: 0,
        opacity: 1,
        stagger: 0.15
      }, "-=1");
  }


  private exitTo(path: string) {
    gsap.to(".hero-text-part", {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        this.ngZone.run(() => this.router.navigate([path]));
      }
    });
  }

  onExploreClick() { this.exitTo('/explore-page'); }
  onBestSellerClick() { this.exitTo('/best-seller'); }
}
