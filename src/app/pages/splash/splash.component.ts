import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() completed = new EventEmitter<void>();

  @ViewChild('splashVideo') splashVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('pinViewport') pinViewportRef!: ElementRef<HTMLElement>;
  @ViewChild('logoWrap') logoWrapRef!: ElementRef<HTMLElement>;
  @ViewChild('progressFill') progressFillRef!: ElementRef<HTMLElement>;
  @ViewChild('progressLabel') progressLabelRef!: ElementRef<HTMLElement>;

  playProgress = 0;
  isExiting = false;

  private finished = false;
  private logoTween?: gsap.core.Tween;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#050a08';
  }

  ngAfterViewInit(): void {
    const video = this.splashVideoRef.nativeElement;
    const logoEl = this.logoWrapRef.nativeElement;

    this.logoTween = gsap.fromTo(
      logoEl,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.15 }
    );

    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1.85;

    video.addEventListener('timeupdate', () => this.updateProgress(video));
    video.addEventListener('ended', () => this.ngZone.run(() => this.finishSplash()));

    const playVideo = (): void => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          video.play().catch(() => undefined);
        });
      }
    };

    playVideo();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.body.style.background = '';
    this.logoTween?.kill();
    this.splashVideoRef?.nativeElement?.pause();
  }

  skipSplash(): void {
    this.finishSplash();
  }

  private updateProgress(video: HTMLVideoElement): void {
    if (!video.duration) {
      return;
    }

    const progress = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
    this.progressFillRef.nativeElement.style.width = `${progress}%`;
    this.progressLabelRef.nativeElement.textContent = `${progress}%`;

    const logoOpacity = progress < 20 ? 1 : Math.max(0, 1 - (progress - 20) / 25);
    this.logoWrapRef.nativeElement.style.opacity = String(logoOpacity);

    this.ngZone.run(() => {
      this.playProgress = progress;
    });
  }

  private finishSplash(): void {
    if (this.finished || this.isExiting) {
      return;
    }

    this.finished = true;
    this.isExiting = true;

    gsap.to(this.pinViewportRef.nativeElement, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        this.completed.emit();
      },
    });
  }
}
