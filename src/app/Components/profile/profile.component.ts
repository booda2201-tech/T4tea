import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, HostListener } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  @ViewChild('logo', { static: false }) logo!: ElementRef;
  @ViewChildren('floatingItem') floatingItems!: QueryList<ElementRef>;
  @ViewChildren('floatingIcon') floatingIcons!: QueryList<ElementRef>;

  isSearchOpen = false;
  isAccountMenuOpen = false;
  isMobileMenuOpen = false;

  ngAfterViewInit() {

    setTimeout(() => {
      this.initNavbarAnimation();
      this.initFloatingEffect();
    }, 500);
  }

  initFloatingEffect() {

    this.floatingItems.forEach((item, index) => {
      gsap.to(item.nativeElement, {
        y: -6,
        duration: 1.5 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });


    this.floatingIcons.forEach((icon, index) => {
      gsap.to(icon.nativeElement, {
        y: 4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      });
    });
  }

  initNavbarAnimation() {
    if (!this.navbar) return;

    const nav = this.navbar.nativeElement;

    gsap.to(nav, {
      scrollTrigger: {
        trigger: "body",
        start: "top -50",
        toggleActions: "play none none reverse",
      },
      top: "15px",
      width: "90%",
      backgroundColor: "#003d37",
      backgroundImage: "none",
      height: "75px",
      borderRadius: "50px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      duration: 0.5
    });
  }


  toggleSearch() { this.isSearchOpen = !this.isSearchOpen; }
  toggleAccountMenu(event: Event) {
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
