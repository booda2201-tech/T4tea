import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginMode = false; // لو true هيعرض Login، لو false هيعرض Signup زي الصورة

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // أنيميشن دخول ناعم للمربع الزجاجي
    gsap.from('.auth-card', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
