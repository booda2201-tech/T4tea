import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

// forgot-password.component.ts
ngAfterViewInit(): void {
  gsap.from('.welcome-text', { opacity: 0, y: -30, duration: 0.5 });

  gsap.from('.input-group,' , {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1
  });


  gsap.fromTo('.back-to-login-wrapper',
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.5, delay: 0.4 }
  );
}

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log('Sending reset email to:', this.forgotForm.value.email);

    }
  }
}
