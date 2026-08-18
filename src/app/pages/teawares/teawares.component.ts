import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Teaware } from '../../models/product.model';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { isComingSoon } from '../../shared/utils/coming-soon.util';

interface TypeFilter {
  label: string;
  value: string | null;
}

@Component({
  selector: 'app-teawares',
  templateUrl: './teawares.component.html',
  styleUrls: ['./teawares.component.scss'],
})
export class TeawaresComponent implements OnInit, OnDestroy {
  allProducts: Teaware[] = [];
  featuredImage = 'assets/imges/bot 3 1.png';
  ritualImage = 'assets/imges/tea hold 1 (1).png';

  typeFilters: TypeFilter[] = [{ label: 'All', value: null }];
  activeType: string | null = null;
  private subs = new Subscription();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();

    this.subs.add(
      this.catalogService.teawares$.subscribe(items => {
        this.allProducts = items;
        if (items[0]?.image) {
          this.featuredImage = items[0].image;
        }
        this.rebuildFilters(items);
      })
    );

    gsap.from('.teawares-hero__copy', {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: 'power3.out',
    });

    gsap.from('.teawares-hero__visual', {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 1,
      delay: 0.15,
      ease: 'power3.out',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get filteredProducts(): Teaware[] {
    if (!this.activeType) {
      return this.allProducts;
    }

    return this.allProducts.filter(product =>
      product.type.toLowerCase().includes(this.activeType!.toLowerCase())
    );
  }

  get firstRowProducts(): Teaware[] {
    return this.filteredProducts.slice(0, 3);
  }

  get secondRowProducts(): Teaware[] {
    return this.filteredProducts.slice(3);
  }

  get showCollectionBanner(): boolean {
    return !this.activeType && this.filteredProducts.length > 3;
  }

  setFilter(value: string | null): void {
    this.activeType = value;
  }

  isFilterActive(value: string | null): boolean {
    return this.activeType === value;
  }

  toggleWishlist(event: Event, item: Teaware): void {
    event.preventDefault();
    event.stopPropagation();
    pulseWishlistButton(event);
    this.wishlistService.toggle({
      id: item.id,
      name: item.title,
      type: item.type,
      price: item.price,
      image: item.image,
    });
  }

  isWishlisted(id: string): boolean {
    return this.wishlistService.isWishlisted(id);
  }

  quickAdd(item: Teaware, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (isComingSoon(item.price)) {
      return;
    }
    this.cartService.addToCart({
      id: item.id,
      kind: 'teaware',
      name: item.title,
      type: item.type,
      price: item.price,
      image: item.image,
    });
  }

  private rebuildFilters(items: Teaware[]): void {
    const types = [...new Set(items.map(item => item.type).filter(Boolean))];
    this.typeFilters = [
      { label: 'All', value: null },
      ...types.map(type => ({ label: type, value: type })),
    ];

    if (this.activeType && !types.includes(this.activeType)) {
      this.activeType = null;
    }
  }
}
