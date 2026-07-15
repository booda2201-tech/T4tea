import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
    gsap.from('.about-hero', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
}
