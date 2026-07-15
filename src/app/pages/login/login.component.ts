import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthMode, AuthService } from '../../core/services/auth.service';

interface AuthModeConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  toggleText: string;
  toggleMode: AuthMode | null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('loginVideo') loginVideoRef!: ElementRef<HTMLVideoElement>;

  authForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  mode: AuthMode = 'login';
  statusMessage = '';
  isError = false;
  resetToken = '';

  private readonly destroy$ = new Subject<void>();
  private readonly videoEdgeBuffer = 0.35;
  private pingPongDirection: 1 | -1 = 1;
  private rafId?: number;
  private lastFrameTime = 0;
  private reverseTargetTime = 0;
  private useNativeReverse = false;
  private videoEndedHandler?: () => void;

  private readonly modeConfigs: Record<AuthMode, AuthModeConfig> = {
    login: {
      title: 'Welcome Back',
      subtitle: 'Enter your details to sign in to your account.',
      submitLabel: 'Login',
      toggleText: "Don't have an account? Create one",
      toggleMode: 'signup',
    },
    signup: {
      title: 'Create Account',
      subtitle: 'Join T4 Tea and start your ritual.',
      submitLabel: 'Sign Up',
      toggleText: 'Already have an account? Sign in',
      toggleMode: 'login',
    },
    forgot: {
      title: 'Forgot Password',
      subtitle: 'Enter your phone number and we will help you reset your password.',
      submitLabel: 'Send Reset Link',
      toggleText: 'Back to Login',
      toggleMode: 'login',
    },
    reset: {
      title: 'Reset Password',
      subtitle: 'Choose a new password for your account.',
      submitLabel: 'Update Password',
      toggleText: 'Back to Login',
      toggleMode: 'login',
    },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      const routeMode = data['authMode'] as AuthMode | undefined;
      if (routeMode && this.isValidMode(routeMode)) {
        this.setMode(routeMode, false);
        this.buildForm();
      }
    });

    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const modeParam = params.get('mode') as AuthMode | null;
      const tokenParam = params.get('token');

      if (modeParam && this.isValidMode(modeParam)) {
        this.setMode(modeParam, false);
      } else if (!this.route.snapshot.data['authMode']) {
        this.setMode('login', false);
      }

      if (tokenParam) {
        this.resetToken = tokenParam;
      } else if (this.mode === 'reset') {
        this.resetToken = this.authService.getStoredResetToken() ?? '';
      }

      this.buildForm();
    });
  }

  ngAfterViewInit(): void {
    const video = this.loginVideoRef?.nativeElement;
    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;

    this.videoEndedHandler = () => this.beginReverse(video);
    video.addEventListener('ended', this.videoEndedHandler);

    const startPlayback = (): void => {
      this.pingPongDirection = 1;
      this.reverseTargetTime = this.videoEdgeBuffer;
      this.startPingPongLoop(video);
      this.playVideoForward(video);
    };

    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
    }
  }

  ngOnDestroy(): void {
    this.stopPingPongLoop();

    const video = this.loginVideoRef?.nativeElement;
    if (video) {
      if (this.videoEndedHandler) {
        video.removeEventListener('ended', this.videoEndedHandler);
      }
      video.pause();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  get config(): AuthModeConfig {
    return this.modeConfigs[this.mode];
  }

  get isLoginMode(): boolean {
    return this.mode === 'login';
  }

  get isSignupMode(): boolean {
    return this.mode === 'signup';
  }

  get isForgotMode(): boolean {
    return this.mode === 'forgot';
  }

  get isResetMode(): boolean {
    return this.mode === 'reset';
  }

  switchMode(nextMode: AuthMode): void {
    this.setMode(nextMode);
    this.router.navigate(['/login'], {
      queryParams: nextMode === 'login' ? {} : { mode: nextMode },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isButtonDisabled(): boolean {
    return this.authForm.invalid;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.statusMessage = '';
    this.isError = false;

    switch (this.mode) {
      case 'login':
        this.handleLogin();
        break;
      case 'signup':
        this.handleSignup();
        break;
      case 'forgot':
        this.handleForgot();
        break;
      case 'reset':
        this.handleReset();
        break;
    }
  }

  private handleLogin(): void {
    const { phone, password } = this.authForm.value;
    this.authService.login(phone, password).subscribe(result => {
      if (result.success) {
        this.router.navigate(['/profile']);
        return;
      }

      this.showStatus(result.message ?? 'Login failed.', true);
    });
  }

  private handleSignup(): void {
    const { name, phone, password } = this.authForm.value;
    this.authService.register(name, phone, password).subscribe(result => {
      if (result.success) {
        this.router.navigate(['/profile']);
        return;
      }

      this.showStatus(result.message ?? 'Registration failed.', true);
    });
  }

  private handleForgot(): void {
    const { phone } = this.authForm.value;
    const result = this.authService.requestPasswordReset(phone);

    if (!result.success) {
      this.showStatus(result.message ?? 'Unable to process request.', true);
      return;
    }

    this.showStatus(result.message ?? 'Check your messages for reset instructions.', false);

    if (result.resetToken) {
      setTimeout(() => {
        this.router.navigate(['/login'], { queryParams: { mode: 'reset', token: result.resetToken } });
      }, 1200);
    }
  }

  private handleReset(): void {
    const { password } = this.authForm.value;
    const token = this.resetToken || this.authService.getStoredResetToken() || '';

    const result = this.authService.resetPassword(token, password);

    if (result.success) {
      this.showStatus(result.message ?? 'Password updated.', false);
      setTimeout(() => this.switchMode('login'), 1500);
      return;
    }

    this.showStatus(result.message ?? 'Reset failed.', true);
  }

  private setMode(mode: AuthMode, rebuildForm = true): void {
    this.mode = mode;
    this.statusMessage = '';
    this.isError = false;

    if (rebuildForm) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const phoneValidators = [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)];

    switch (this.mode) {
      case 'signup':
        this.authForm = this.fb.group({
          name: ['', Validators.required],
          phone: ['', phoneValidators],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        }, { validators: this.passwordMatchValidator });
        break;
      case 'forgot':
        this.authForm = this.fb.group({
          phone: ['', phoneValidators],
        });
        break;
      case 'reset':
        this.authForm = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        }, { validators: this.passwordMatchValidator });
        break;
      default:
        this.authForm = this.fb.group({
          phone: ['', phoneValidators],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
  }

  private passwordMatchValidator(group: FormGroup): { mismatch: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  private isValidMode(mode: string): mode is AuthMode {
    return ['login', 'signup', 'forgot', 'reset'].includes(mode);
  }

  private showStatus(message: string, isError: boolean): void {
    this.statusMessage = message;
    this.isError = isError;
  }

  private startPingPongLoop(video: HTMLVideoElement): void {
    this.stopPingPongLoop();
    this.lastFrameTime = performance.now();

    const tick = (now: number): void => {
      const duration = video.duration;

      if (!duration || !Number.isFinite(duration)) {
        this.lastFrameTime = now;
        this.rafId = requestAnimationFrame(tick);
        return;
      }

      const delta = Math.min((now - this.lastFrameTime) / 1000, 0.05);
      this.lastFrameTime = now;

      if (this.pingPongDirection === 1) {
        if (video.ended || video.currentTime >= duration - this.videoEdgeBuffer) {
          this.beginReverse(video);
        } else if (video.paused) {
          this.playVideoForward(video);
        }
      } else if (this.useNativeReverse) {
        if (video.paused) {
          video.play().catch(() => undefined);
        }

        if (video.currentTime <= this.videoEdgeBuffer) {
          this.finishReverse(video);
        }
      } else {
        if (!video.paused) {
          video.pause();
        }

        this.reverseTargetTime = Math.max(this.videoEdgeBuffer, this.reverseTargetTime - delta);
        this.seekVideo(video, this.reverseTargetTime);

        if (this.reverseTargetTime <= this.videoEdgeBuffer) {
          this.finishReverse(video);
        }
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private beginReverse(video: HTMLVideoElement): void {
    if (this.pingPongDirection === -1) {
      return;
    }

    const duration = video.duration;
    if (!duration || !Number.isFinite(duration)) {
      return;
    }

    this.pingPongDirection = -1;
    this.reverseTargetTime = Math.max(
      this.videoEdgeBuffer,
      Math.min(video.currentTime, duration - this.videoEdgeBuffer)
    );
    this.seekVideo(video, this.reverseTargetTime);
    this.lastFrameTime = performance.now();

    try {
      // Chrome throws NotSupportedError for negative playback rates
      video.playbackRate = -1;
    } catch {
      this.useNativeReverse = false;
      video.playbackRate = 1;
      video.pause();
      this.reverseTargetTime = video.currentTime;
      return;
    }

    const playPromise = video.play();

    if (!playPromise) {
      this.useNativeReverse = false;
      video.playbackRate = 1;
      video.pause();
      return;
    }

    const startTime = this.reverseTargetTime;
    playPromise
      .then(() => {
        window.setTimeout(() => {
          if (this.pingPongDirection !== -1) {
            return;
          }

          const movedBackward = video.currentTime < startTime - 0.01;
          this.useNativeReverse = movedBackward && video.playbackRate < 0;

          if (!this.useNativeReverse) {
            video.playbackRate = 1;
            video.pause();
            this.reverseTargetTime = video.currentTime;
          }
        }, 120);
      })
      .catch(() => {
        this.useNativeReverse = false;
        video.playbackRate = 1;
        video.pause();
      });
  }

  private finishReverse(video: HTMLVideoElement): void {
    this.pingPongDirection = 1;
    this.useNativeReverse = false;
    this.reverseTargetTime = this.videoEdgeBuffer;
    video.playbackRate = 1;
    this.seekVideo(video, this.videoEdgeBuffer);
    this.playVideoForward(video);
  }

  private playVideoForward(video: HTMLVideoElement): void {
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        window.setTimeout(() => {
          video.play().catch(() => undefined);
        }, 50);
      });
    }
  }

  private seekVideo(video: HTMLVideoElement, time: number): void {
    if (typeof video.fastSeek === 'function') {
      video.fastSeek(time);
      return;
    }

    video.currentTime = time;
  }

  private stopPingPongLoop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }
  }
}
