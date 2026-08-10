import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 85;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroPin') heroPin!: ElementRef<HTMLElement>;
  @ViewChild('heroImage') heroImage!: ElementRef<HTMLImageElement>;
  @ViewChild('heroContent') heroContent!: ElementRef<HTMLElement>;
  @ViewChild('heroHint') heroHint!: ElementRef<HTMLElement>;
  @ViewChild('heroProgressFill') heroProgressFill!: ElementRef<HTMLElement>;
  @ViewChild('heroProgressLabel') heroProgressLabel!: ElementRef<HTMLElement>;
  @ViewChild('heroNavbar') heroNavbar!: NavbarComponent;

  heroScrollProgress = 0;
  heroSequenceLoading = true;

  collections = {
    blackTea: 'assets/imges/our collectons/6Q1A2223.webp',
    greenTea: 'assets/imges/our collectons/6Q1A2220.webp',
    herbalTea: 'assets/imges/our collectons/6Q1A3357.webp',
  };

  teawarePromoImg = 'assets/imges/our collectons/6Q1A2366.webp';

  private gsapCtx?: gsap.Context;
  private frames: HTMLImageElement[] = [];
  private lastLabelUpdate = -1;
  private currentFrame = 1;

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    document.documentElement.style.scrollBehavior = 'auto';

    this.ngZone.runOutsideAngular(() => {
      this.preloadFrames()
        .then((frames) => {
          this.frames = frames;
          this.lockHeroImageLayout();
          this.setHeroFrame(1);

          this.ngZone.run(() => {
            this.heroSequenceLoading = false;
            this.cdr.detectChanges();
          });

          requestAnimationFrame(() => {
            this.initHeroSequenceScrub();
            ScrollTrigger.refresh();
          });
        })
        .catch(() => {
          this.ngZone.run(() => {
            this.heroSequenceLoading = false;
            this.cdr.detectChanges();
          });
        });
    });

    gsap.from('.hero-fade-item', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.4,
      immediateRender: false,
    });
  }

  ngOnDestroy(): void {
    document.documentElement.style.scrollBehavior = '';
    this.gsapCtx?.revert();
    gsap.killTweensOf('.hero-fade-item');
    this.frames = [];
  }

  @HostListener('window:resize')
  onResize(): void {
    ScrollTrigger.refresh();
  }

  private preloadFrames(): Promise<HTMLImageElement[]> {
    const loadFrame = (index: number): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          img.decode().then(() => resolve(img)).catch(() => resolve(img));
        };
        img.onerror = () => reject(new Error(`Failed to load frame ${index}`));
        img.src = `assets/imges/hero-sequence/${index}.webp`;
      });

    return Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, i) => loadFrame(i + 1))
    );
  }

  private initHeroSequenceScrub(): void {
    const sectionEl = this.heroSection.nativeElement;
    const pinEl = this.heroPin.nativeElement;
    const contentEl = this.heroContent.nativeElement;
    const hintEl = this.heroHint.nativeElement;
    const progressEl = this.heroProgressFill.nativeElement;
    const labelEl = this.heroProgressLabel.nativeElement;

    const playback = { frame: 1 };

    this.gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4.5}`,
          pin: pinEl,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const pct = Math.round(progress * 100);

            progressEl.style.width = `${progress * 100}%`;

            if (pct !== this.lastLabelUpdate) {
              this.lastLabelUpdate = pct;
              labelEl.textContent = `${pct}%`;
            }

            const contentOpacity = progress < 0.04 ? 1 : Math.max(0, 1 - (progress - 0.04) / 0.08);
            const hintOpacity = progress < 0.06 ? 1 : Math.max(0, 1 - (progress - 0.06) / 0.08);

            contentEl.style.opacity = String(contentOpacity);
            hintEl.style.opacity = String(hintOpacity);
            this.heroNavbar?.setHeroOverlayOpacity(contentOpacity);
          },
          onLeave: () => {
            this.heroNavbar?.exitHeroControl();
          },
          onEnterBack: (self) => {
            this.heroNavbar?.enterHeroControl();
            const progress = self.progress;
            const navOpacity = progress < 0.04 ? 1 : Math.max(0, 1 - (progress - 0.04) / 0.08);
            this.heroNavbar?.setHeroOverlayOpacity(navOpacity);
          },
        },
      });

      tl.to(playback, {
        frame: FRAME_COUNT,
        ease: 'none',
        snap: { frame: 1 },
        onUpdate: () => {
          const frame = Math.round(playback.frame);
          if (frame === this.currentFrame) {
            return;
          }
          this.currentFrame = frame;
          this.setHeroFrame(frame);
        },
      });

      gsap.to(hintEl, {
        y: 6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, this.hostRef.nativeElement);
  }

  private lockHeroImageLayout(): void {
    const heroImageEl = this.heroImage?.nativeElement;
    const firstFrame = this.frames[0];
    if (!heroImageEl || !firstFrame?.naturalWidth) {
      return;
    }

    heroImageEl.width = firstFrame.naturalWidth;
    heroImageEl.height = firstFrame.naturalHeight;
  }

  private setHeroFrame(frame: number): void {
    const heroImageEl = this.heroImage?.nativeElement;
    const preloaded = this.frames[frame - 1];
    if (!heroImageEl || !preloaded) {
      return;
    }

    heroImageEl.src = preloaded.currentSrc || preloaded.src;
  }
}
