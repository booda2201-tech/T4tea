import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLoginMode = false;

  constructor() { }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.animateCard();
  }


  animateCard() {
    gsap.from('.auth-card', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;

    gsap.from('.auth-form, .title', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.1
    });
  }
}
