import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLoginMode = false;
  showPassword = false;
  showRePassword = false; 

  constructor() { }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.animateCard();
  }


  animateCard() {
    gsap.from('.auth-card', {
      opacity: 0,
      x: -350,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3
    });
  }

toggleMode() {
  this.isLoginMode = !this.isLoginMode;


  gsap.fromTo('.welcome-text',
    { opacity: 0, y: -400 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );

  gsap.from('.input-group', {
    opacity: 0,
    y: 550,
    duration: 0.6,
    stagger: 0.3,
    ease: 'back.out(1.7)'
  });
}


togglePasswordVisibility(type: string) {
    if (type === 'pass') this.showPassword = !this.showPassword;
    if (type === 'repass') this.showRePassword = !this.showRePassword;
  }



}
