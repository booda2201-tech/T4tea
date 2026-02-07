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
// export class LoginComponent implements OnInit, AfterViewInit {
//   authForm!: FormGroup;
//   authMode: 'login' | 'signup' | 'forgot' = 'login';
//   isLoginMode = false;
//   showPassword = false;
//   showRePassword = false;

// constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

//   ngOnInit(): void {
//     this.initForm();
//   }

//   initForm() {
//     this.authForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3)]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       repassword: ['']
//     }, {

//       validators: this.passwordMatchValidator
//     });
//   }


//   setMode(mode: 'login' | 'signup' | 'forgot') {
//     this.authMode = mode;


//     gsap.fromTo('.welcome-text',
//       { opacity: 0, y: -50 },
//       { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
//     );


//     gsap.from('.input-group', {
//       opacity: 0,
//       y: 30,
//       duration: 0.4,
//       stagger: 0.1,
//       ease: 'back.out(1.7)'
//     });
//   }

//   get isLoginMode(): boolean { return this.authMode === 'login'; }

//   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
//       if (this.authMode !== 'signup') return null;
//       const password = control.get('password');
//       const repassword = control.get('repassword');
//       return password && repassword && password.value !== repassword.value ? { mismatch: true } : null;
//   }

//   onSubmit() {
//     if (this.authForm.valid) {
//       const data = this.authForm.value;

//       if (this.isLoginMode) {

//         this.authService.login({username: data.username, password: data.password}).subscribe({
//           next: (res) => {
//             console.log('نجح الدخول!', res);
//             this.router.navigate(['/home']);
//           },
//           error: (err) => alert('خطأ في البيانات!')
//         });
//       } else {

//         this.authService.signup(data).subscribe({
//           next: (res) => alert('تم إنشاء الحساب بنجاح!'),
//           error: (err) => alert('حدث خطأ أثناء التسجيل')
//         });
//       }
//     } else {
//       this.markAllAsTouched();
//     }
//   }

//   private markAllAsTouched() {
//     Object.values(this.authForm.controls).forEach(control => {
//       control.markAsTouched();
//     });
//   }

//   ngAfterViewInit(): void {
//     this.animateCard();
//   }


//   animateCard() {
//     gsap.from('.auth-card', {
//       opacity: 0,
//       x: -350,
//       duration: 1,
//       ease: 'power3.out',
//       delay: 0.3
//     });
//   }

//   toggleMode() {
//   this.isLoginMode = !this.isLoginMode;


//   gsap.fromTo('.welcome-text',
//     { opacity: 0, y: -400 },
//     { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
//   );

//   gsap.from('.input-group', {
//     opacity: 0,
//     y: 550,
//     duration: 0.6,
//     stagger: 0.3,
//     ease: 'back.out(1.7)'
//   });
//   }


//   togglePasswordVisibility(type: string) {
//     if (type === 'pass') this.showPassword = !this.showPassword;
//     if (type === 'repass') this.showRePassword = !this.showRePassword;
//   }

//   isButtonDisabled(): boolean {
//       const userInvalid = this.authForm.get('username')?.invalid;
//       const passInvalid = this.authForm.get('password')?.invalid;

//       if (this.authMode === 'forgot') return !!userInvalid;
//       if (this.authMode === 'login') return !!(userInvalid || passInvalid);

//       const repassInvalid = this.authForm.get('repassword')?.invalid;
//       return !!(userInvalid || passInvalid || repassInvalid || this.authForm.hasError('mismatch'));
//   }

// }

export class LoginComponent implements OnInit, AfterViewInit {
  authForm!: FormGroup;

  // الحالة الأساسية (login | signup | forgot)
  authMode: 'login' | 'signup' | 'forgot' = 'login';

  showPassword = false;
  showRePassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Getter لحل مشكلة التكرار التي ظهرت في الصورة (TS2300)
   * نقوم بحذف متغير isLoginMode = false القديم ونستخدم هذا الـ Getter بدلاً منه
   */
  get isLoginMode(): boolean {
    return this.authMode === 'login';
  }

  initForm() {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['']
    }, {
      validators: (control: AbstractControl) => this.passwordMatchValidator(control)
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (this.authMode !== 'signup') return null;
    const password = control.get('password');
    const repassword = control.get('repassword');
    return password && repassword && password.value !== repassword.value ? { mismatch: true } : null;
  }

  /**
   * دالة التبديل الأساسية مع تطبيق GSAP Animations
   * stagger: 0.1 تجعل الحقول تظهر الواحد تلو الآخر بشكل جمالي
   */
setMode(mode: 'login' | 'signup' | 'forgot') {
  this.authMode = mode;

  // أنيميشن العنوان
  gsap.fromTo('.welcome-text',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );

  // أنيميشن المدخلات
  gsap.from('.input-group', {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });

  // --- الأنيميشن الجديد لزرار الرجوع ---
  // نستخدم delay بسيط ليظهر بعد الحقول مباشرة
  gsap.fromTo('.back-to-login-wrapper',
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' }
  );


  gsap.from('.toggle-text', {
    opacity: 0,
    duration: 0.5,
    delay: 0.3
  });
}

  isButtonDisabled(): boolean {
    const userInvalid = this.authForm.get('username')?.invalid;
    const passInvalid = this.authForm.get('password')?.invalid;

    if (this.authMode === 'forgot') return !!userInvalid;
    if (this.authMode === 'login') return !!(userInvalid || passInvalid);

    const repassInvalid = this.authForm.get('repassword')?.invalid;
    return !!(userInvalid || passInvalid || repassInvalid || this.authForm.hasError('mismatch'));
  }

  onSubmit() {
    if (this.authForm.valid) {
      const data = this.authForm.value;

      if (this.authMode === 'login') {
        this.authService.login({username: data.username, password: data.password}).subscribe({
          next: () => this.router.navigate(['/home']),
          error: () => alert('Invalid credentials')
        });
      } else if (this.authMode === 'signup') {
        this.authService.signup(data).subscribe({
          next: () => alert('Account created!'),
          error: () => alert('Signup failed')
        });
      } else {

        alert('Reset link sent to your email');
        this.setMode('login');
      }
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.values(this.authForm.controls).forEach(control => control.markAsTouched());
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

  togglePasswordVisibility(type: string) {
    if (type === 'pass') this.showPassword = !this.showPassword;
    if (type === 'repass') this.showRePassword = !this.showRePassword;
  }
}
