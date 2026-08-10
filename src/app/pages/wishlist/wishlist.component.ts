import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gsap from 'gsap';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { WishlistItem } from '../../models/wishlist-item.model';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistItems$ = this.wishlistService.wishlistItems$;
  wishlistCount$ = this.wishlistService.wishlistCount$;
  isLoggedIn$: Observable<boolean> = this.authService.user$.pipe(map(user => !!user));

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private catalogService: CatalogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.wishlistService.refresh();
    }

    gsap.from('.wishlist-hero__content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  productKind(item: WishlistItem): 'tea' | 'teaware' {
    return this.catalogService.resolveKind(item.id, {
      name: item.name,
      type: item.type,
      price: item.price,
    });
  }

  removeFromWishlist(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    pulseWishlistButton(event);
    this.wishlistService.removeFromWishlist(id);
  }

  addToCart(event: Event, item: WishlistItem): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart({
      id: item.id,
      kind: this.productKind(item) === 'teaware' ? 'teaware' : 'product',
      name: item.name,
      type: item.type,
      price: item.price,
      image: item.image,
    });
  }
}
