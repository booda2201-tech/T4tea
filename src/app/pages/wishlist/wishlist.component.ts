import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { CartService } from '../../core/services/cart.service';
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

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Drop stale local-only junk if API session is available
    this.wishlistService.syncFromApi();

    gsap.from('.wishlist-hero__content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
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
      name: item.name,
      type: item.type,
      price: item.price,
      image: item.image,
    });
  }
}
