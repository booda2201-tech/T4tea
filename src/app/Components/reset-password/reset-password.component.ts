import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  resetForm!: FormGroup;
  showPassword = false;
  showRePassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const p = control.get('password')?.value;
    const cp = control.get('confirmPassword')?.value;
    return p === cp ? null : { mismatch: true };
  }

// reset-password.component.ts
ngAfterViewInit(): void {

  gsap.from('.welcome-text, .reset-icon', {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: 'back.out(2)'
  });

  gsap.from('.input-group,', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1
  });
}

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Password updated successfully!');
    }
  }
}
