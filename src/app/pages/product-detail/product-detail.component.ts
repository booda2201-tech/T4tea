import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import gsap from 'gsap';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { Product, Teaware } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  product!: Product | Teaware;
  teaProduct: Product | null = null;
  relatedProducts: Product[] = [];
  bundleTeaware!: Teaware;
  quantity = 1;
  activeTab: 'description' | 'brewing' = 'description';
  isTeaware = false;
  isWishlisted = false;
  private routeSub?: Subscription;
  private viewReady = false;

  get bundlePrice(): number {
    if (!this.product || !this.bundleTeaware) {
      return 0;
    }
    return this.product.price + this.bundleTeaware.price - 50;
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();

    this.routeSub = combineLatest([
      this.route.paramMap,
      this.catalogService.products$,
      this.catalogService.teawares$,
    ]).subscribe(([params, products, teawares]) => {
      const id = params.get('id');
      this.resolveProduct(id, products, teawares);
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.playAnimations();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  setActiveTab(tab: 'description' | 'brewing'): void {
    this.activeTab = tab;
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(
      {
        id: this.product.id,
        name: this.product.title,
        type: this.product.type,
        price: this.product.price,
        image: this.product.image,
      },
      this.quantity
    );
  }

  toggleWishlist(event?: Event): void {
    if (event) {
      pulseWishlistButton(event);
    }
    this.wishlistService.toggle({
      id: this.product.id,
      name: this.product.title,
      type: this.product.type,
      price: this.product.price,
      image: this.product.image,
    });
    this.isWishlisted = this.wishlistService.isWishlisted(this.product.id);
  }

  quickAdd(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      type: product.type,
      price: product.price,
      image: product.image,
    });
  }

  private resolveProduct(id: string | null, products: Product[], teawares: Teaware[]): void {
    const teaProduct = id ? products.find(p => p.id === id) : undefined;
    const teawareProduct = id ? teawares.find(t => t.id === id) : undefined;

    if (teawareProduct) {
      this.product = teawareProduct;
      this.teaProduct = null;
      this.isTeaware = true;
    } else if (teaProduct) {
      this.product = teaProduct;
      this.teaProduct = teaProduct;
      this.isTeaware = false;
    } else if (products.length) {
      this.product = products[0];
      this.teaProduct = this.product as Product;
      this.isTeaware = false;
    } else if (teawares.length) {
      this.product = teawares[0];
      this.teaProduct = null;
      this.isTeaware = true;
    } else {
      return;
    }

    this.relatedProducts = products.filter(p => p.id !== this.product.id).slice(0, 3);
    this.bundleTeaware = teawares[0] || (this.isTeaware ? (this.product as Teaware) : undefined!);
    this.isWishlisted = this.wishlistService.isWishlisted(this.product.id);
    this.quantity = 1;
    window.scrollTo(0, 0);
    this.playAnimations();
  }

  private playAnimations(): void {
    if (!this.viewReady || !this.product) {
      return;
    }

    gsap.from('.product-image', {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out',
      immediateRender: false,
    });
    gsap.from('.product-info', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
      immediateRender: false,
    });
  }
}
