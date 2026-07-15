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

  private scrollTrigger?: ScrollTrigger;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const fromVars = this.getFromVars();
    const toVars = { opacity: 1, x: 0, y: 0, scale: 1 };

    const tween = gsap.fromTo(element, fromVars, {
      ...toVars,
      duration: this.gsapDuration,
      delay: this.gsapDelay,
      ease: 'power2.out',
      paused: true,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: this.gsapOnce ? 'play none none none' : 'play reverse play reverse',
        once: this.gsapOnce,
      },
    });

    this.scrollTrigger = tween.scrollTrigger;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9;
      if (inView) {
        tween.play();
      }
    });
  }

  ngOnDestroy(): void {
    this.scrollTrigger?.kill();
    gsap.killTweensOf(this.el.nativeElement);
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
