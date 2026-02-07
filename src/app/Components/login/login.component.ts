import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { gsap } from 'gsap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  authForm!: FormGroup;
  isLoginMode = false;
  showPassword = false;
  showRePassword = false;

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['']
    }, {

      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const repassword = control.get('repassword');


  if (password && repassword && password.value !== repassword.value) {
    return { mismatch: true };
  }
  return null;
}

onSubmit() {
  if (this.authForm.valid) {
    const data = this.authForm.value;

    if (this.isLoginMode) {

      this.authService.login({username: data.username, password: data.password}).subscribe({
        next: (res) => {
          console.log('نجح الدخول!', res);
          this.router.navigate(['/home']);
        },
        error: (err) => alert('خطأ في البيانات!')
      });
    } else {

      this.authService.signup(data).subscribe({
        next: (res) => alert('تم إنشاء الحساب بنجاح!'),
        error: (err) => alert('حدث خطأ أثناء التسجيل')
      });
    }
  } else {
    this.markAllAsTouched();
  }
}

  private markAllAsTouched() {
    Object.values(this.authForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

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

  isButtonDisabled(): boolean {
    const usernameInvalid = this.authForm.get('username')?.invalid;
    const passwordInvalid = this.authForm.get('password')?.invalid;
    const mismatch = this.authForm.hasError('mismatch');

    if (this.isLoginMode) {

      return !!(usernameInvalid || passwordInvalid);
    } else {

      const repassInvalid = this.authForm.get('repassword')?.invalid;
      return !!(usernameInvalid || passwordInvalid || repassInvalid || mismatch);
    }
  }

}
