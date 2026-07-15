import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { SearchService } from '../../../core/services/search.service';
import { SearchResult } from '../../../models/search-result.model';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss'],
})
export class SearchOverlayComponent implements OnInit, OnDestroy {
  @ViewChild('backdrop') backdrop?: ElementRef<HTMLElement>;
  @ViewChild('panel') panel?: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isRendered = false;
  query = '';
  results: SearchResult[] = [];

  private subscription = new Subscription();
  private isClosing = false;

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchService.isOpen$.subscribe(open => {
        if (open) {
          this.openOverlay();
        } else {
          this.closeOverlay();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.body.style.overflow = '';
  }

  onQueryChange(): void {
    this.results = this.searchService.search(this.query);
  }

  closeSearch(): void {
    this.searchService.closeSearch();
  }

  openResult(result: SearchResult): void {
    this.closeSearch();
    this.router.navigate(['/product', result.id]);
  }

  goToShop(): void {
    this.closeSearch();
    this.router.navigate(['/shop']);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeSearch();
    }
  }

  private openOverlay(): void {
    if (this.isClosing) {
      return;
    }

    this.query = '';
    this.results = [];
    this.isRendered = true;
    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      if (!this.backdrop?.nativeElement || !this.panel?.nativeElement) {
        return;
      }

      gsap.killTweensOf([this.backdrop.nativeElement, this.panel.nativeElement]);
      gsap.set(this.backdrop.nativeElement, { opacity: 0, pointerEvents: 'auto' });
      gsap.set(this.panel.nativeElement, { opacity: 0, y: -16 });

      gsap.to(this.backdrop.nativeElement, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      });

      gsap.to(this.panel.nativeElement, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power3.out',
        onComplete: () => this.searchInput?.nativeElement.focus(),
      });

      document.body.style.overflow = 'hidden';
    });
  }

  private closeOverlay(): void {
    if (!this.isRendered || this.isClosing) {
      return;
    }

    if (!this.backdrop?.nativeElement || !this.panel?.nativeElement) {
      this.isRendered = false;
      document.body.style.overflow = '';
      return;
    }

    this.isClosing = true;
    gsap.killTweensOf([this.backdrop.nativeElement, this.panel.nativeElement]);

    gsap.to(this.backdrop.nativeElement, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });

    gsap.to(this.panel.nativeElement, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: 'power3.in',
      onComplete: () => {
        this.isRendered = false;
        this.isClosing = false;
        this.query = '';
        this.results = [];
        document.body.style.overflow = '';
        this.cdr.detectChanges();
      },
    });
  }
}
