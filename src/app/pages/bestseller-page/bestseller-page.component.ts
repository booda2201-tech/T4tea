import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-bestseller-page',
  templateUrl: './bestseller-page.component.html',
  styleUrls: ['./bestseller-page.component.scss'],
})
export class BestsellerPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  bestsellerProducts: Product[] = [];
  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();
    this.sub = this.catalogService.products$.subscribe(products => {
      this.bestsellerProducts = products.slice(0, 8);
    });
  }

  ngAfterViewInit(): void {
    gsap.from('.bestseller-hero__content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });

    const video = this.heroVideo?.nativeElement;
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => undefined);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleWishlist(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    pulseWishlistButton(event);
    this.wishlistService.toggle({
      id: product.id,
      name: product.title,
      type: product.type,
      price: product.price,
      image: product.image,
    });
  }

  isWishlisted(id: string): boolean {
    return this.wishlistService.isWishlisted(id);
  }

  quickAdd(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart({
      id: product.id,
      kind: 'product',
      name: product.title,
      type: product.type,
      price: product.price,
      image: product.image,
    });
  }
}
