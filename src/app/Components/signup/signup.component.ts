import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { gsap } from 'gsap/gsap-core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showRePassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // signup.component.ts
ngAfterViewInit(): void {
  gsap.fromTo('.welcome-text',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.5 }
  );


  gsap.from('.input-group', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  });
}



  passwordMatchValidator(control: AbstractControl) {
    const pass = control.get('password')?.value;
    const rePass = control.get('repassword')?.value;
    return pass === rePass ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);

    }
  }
}
