import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.from('.auth-card', {
      opacity: 0,
      x: -350,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.3
    });
  }
}
