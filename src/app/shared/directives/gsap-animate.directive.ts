import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appGsapAnimate]',
})
export class GsapAnimateDirective implements AfterViewInit, OnDestroy {
  @Input() appGsapAnimate = 'fade-up';
  @Input() gsapDelay = 0;
  @Input() gsapDuration = 0.8;
  @Input() gsapOnce = true;

  private tween?: gsap.core.Tween;
  private scrollTrigger?: ScrollTrigger;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const reduceMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' });
      return;
    }

    const fromVars = this.getFromVars();
    this.tween = gsap.fromTo(element, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: this.gsapDuration,
      delay: this.gsapDelay,
      ease: 'power2.out',
      overwrite: 'auto',
      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
        toggleActions: this.gsapOnce ? 'play none none none' : 'play reverse play reverse',
        once: this.gsapOnce,
        invalidateOnRefresh: true,
        onRefresh: () => this.playIfInView(),
      },
    });

    this.scrollTrigger = this.tween.scrollTrigger;
    this.playIfInView();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      this.playIfInView();
    });
  }

  ngOnDestroy(): void {
    this.scrollTrigger?.kill();
    this.tween?.kill();
    gsap.killTweensOf(this.el.nativeElement);
  }

  private playIfInView(): void {
    const tween = this.tween;
    const element = this.el.nativeElement;
    if (!tween || tween.progress() === 1) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const inView = rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
    if (inView) {
      tween.play();
    }
  }

  private getFromVars(): gsap.TweenVars {
    switch (this.appGsapAnimate) {
      case 'fade-left':
        return { opacity: 0, x: -30 };
      case 'fade-right':
        return { opacity: 0, x: 30 };
      case 'fade-scale':
        return { opacity: 0, scale: 0.95 };
      case 'fade-in':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 30 };
    }
  }
}
