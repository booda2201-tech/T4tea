import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { CatalogService } from '../../../core/services/catalog.service';
import { Product } from '../../../models/product.model';

register();

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BestSellerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  teaProducts: Product[] = [];
  private initialized = false;
  private sub?: Subscription;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();
    this.sub = this.catalogService.products$.subscribe(products => {
      this.teaProducts = products.slice(0, 4);
    });
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private initSwiper(): void {
    if (this.initialized || !this.swiperRef?.nativeElement) {
      return;
    }

    const swiperEl = this.swiperRef.nativeElement;
    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: {
          slidesPerView: 3,
          centeredSlides: false,
        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
    swiperEl.initialize();
    this.initialized = true;
  }
}
