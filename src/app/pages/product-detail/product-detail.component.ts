import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import gsap from 'gsap';
import { ApiResponseHelper } from '../../core/services/api-response.helper';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { ProductsApiService } from '../../core/services/products-api.service';
import { TeawaresApiService } from '../../core/services/teawares-api.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { Product, Teaware } from '../../models/product.model';
import { isComingSoon as hasNoSellablePrice } from '../../shared/utils/coming-soon.util';

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
  selectedImageIndex = 0;
  private routeSub?: Subscription;
  private detailSub?: Subscription;
  private viewReady = false;
  private lastDetailKey: string | null = null;

  private static readonly AUTO_PLAY_MS = 4200;
  private autoPlayTimer?: ReturnType<typeof setInterval>;
  private autoPlayPaused = false;

  get galleryImages(): string[] {
    if (!this.product) {
      return [];
    }

    const images = (this.product.images || []).filter(Boolean);
    if (images.length) {
      return [...new Set(images)];
    }

    return this.product.image ? [this.product.image] : [];
  }

  get activeImage(): string {
    return this.galleryImages[this.selectedImageIndex] || this.product?.image || '';
  }

  get bundlePrice(): number {
    if (!this.product || !this.bundleTeaware) {
      return 0;
    }
    return this.product.price + this.bundleTeaware.price - 50;
  }

  get isComingSoon(): boolean {
    return hasNoSellablePrice(this.product?.price);
  }

  get showBundle(): boolean {
    return (
      !this.isTeaware &&
      !!this.bundleTeaware &&
      !this.isComingSoon &&
      !hasNoSellablePrice(this.bundleTeaware.price)
    );
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService,
    private productsApi: ProductsApiService,
    private teawaresApi: TeawaresApiService,
    private apiHelper: ApiResponseHelper
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();

    this.routeSub = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.catalogService.products$,
      this.catalogService.teawares$,
    ]).subscribe(([params, query, products, teawares]) => {
      const id = params.get('id');
      const kind = (query.get('kind') || query.get('type') || '').toLowerCase();
      this.resolveProduct(id, products, teawares, kind);
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.playAnimations();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.detailSub?.unsubscribe();
    this.stopAutoPlay();
  }

  setActiveTab(tab: 'description' | 'brewing'): void {
    this.activeTab = tab;
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.galleryImages.length) {
      return;
    }
    this.selectedImageIndex = index;
    // Give the visitor a full cycle on the image they picked.
    this.restartAutoPlay();
  }

  pauseAutoPlay(): void {
    this.autoPlayPaused = true;
  }

  resumeAutoPlay(): void {
    this.autoPlayPaused = false;
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();

    const reducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || this.galleryImages.length < 2) {
      return;
    }

    this.autoPlayTimer = setInterval(() => {
      if (this.autoPlayPaused) {
        return;
      }

      const total = this.galleryImages.length;
      if (total < 2) {
        this.stopAutoPlay();
        return;
      }

      this.selectedImageIndex = (this.selectedImageIndex + 1) % total;
    }, ProductDetailComponent.AUTO_PLAY_MS);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
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
    if (this.isComingSoon) {
      return;
    }

    this.cartService.addToCart(
      {
        id: this.product.id,
        kind: this.isTeaware ? 'teaware' : 'product',
        name: this.product.title,
        type: this.product.type,
        price: this.product.price,
        image: this.activeImage || this.product.image,
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
      image: this.activeImage || this.product.image,
    });
    this.isWishlisted = this.wishlistService.isWishlisted(this.product.id);
  }

  quickAdd(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (hasNoSellablePrice(product.price)) {
      return;
    }
    this.cartService.addToCart({
      id: product.id,
      kind: 'product',
      name: product.title,
      type: product.type,
      price: product.price,
      image: product.image,
    });
  }

  private resolveProduct(
    id: string | null,
    products: Product[],
    teawares: Teaware[],
    kind: string
  ): void {
    const previousId = this.product?.id ?? null;
    const previousImages =
      this.product && previousId != null && id != null && String(previousId) === String(id)
        ? this.product.images
        : undefined;

    const matchId = (itemId: string) => id != null && String(itemId) === String(id);
    const teaProduct = id ? products.find(p => matchId(p.id)) : undefined;
    const teawareProduct = id ? teawares.find(t => matchId(t.id)) : undefined;

    const preferTeaware = kind === 'teaware' || kind === 'ware';
    const preferTea = kind === 'tea' || kind === 'product' || kind === 'shop';

    if (preferTeaware && teawareProduct) {
      this.product = teawareProduct;
      this.teaProduct = null;
      this.isTeaware = true;
    } else if (preferTea && teaProduct) {
      this.product = teaProduct;
      this.teaProduct = teaProduct;
      this.isTeaware = false;
    } else if (teaProduct && !preferTeaware) {
      this.product = teaProduct;
      this.teaProduct = teaProduct;
      this.isTeaware = false;
    } else if (teawareProduct) {
      this.product = teawareProduct;
      this.teaProduct = null;
      this.isTeaware = true;
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

    // Don't lose gallery fetched from GetById when the catalog list re-emits a cover-only product.
    if (previousImages && previousImages.length > (this.product.images?.length || 0)) {
      this.product = {
        ...this.product,
        images: previousImages,
        image: previousImages[0] || this.product.image,
      };
      if (this.teaProduct && !this.isTeaware) {
        this.teaProduct = this.product as Product;
      }
    }

    const idChanged = previousId !== this.product.id;

    this.relatedProducts = products.filter(p => p.id !== this.product.id).slice(0, 3);
    this.bundleTeaware = teawares[0] || (this.isTeaware ? (this.product as Teaware) : undefined!);
    this.isWishlisted = this.wishlistService.isWishlisted(this.product.id);
    this.quantity = 1;
    if (idChanged) {
      this.selectedImageIndex = 0;
      window.scrollTo(0, 0);
      this.playAnimations();
      this.restartAutoPlay();
    }

    if (id) {
      const detailKey = `${this.isTeaware ? 'teaware' : 'tea'}:${id}`;
      if (detailKey !== this.lastDetailKey) {
        this.lastDetailKey = detailKey;
        this.loadDetailImages(id, this.isTeaware);
      }
    }
  }

  /** GetById often returns the full image gallery when the list endpoint only has a cover. */
  private loadDetailImages(id: string, isTeaware: boolean): void {
    this.detailSub?.unsubscribe();

    const request$ = isTeaware ? this.teawaresApi.getById(id) : this.productsApi.getById(id);

    this.detailSub = request$.subscribe({
      next: res => {
        const record = this.unwrapDetail(res);
        if (!record) {
          return;
        }

        const urls = this.apiHelper.extractImageUrls(record);
        if (!urls.length) {
          return;
        }

        const merged = [
          ...new Set([...(this.product.images || []), ...urls, this.product.image].filter(Boolean)),
        ];
        this.product = {
          ...this.product,
          image: merged[0] || this.product.image,
          images: merged,
        };

        if (this.teaProduct && !isTeaware) {
          this.teaProduct = this.product as Product;
        }

        if (this.selectedImageIndex >= merged.length) {
          this.selectedImageIndex = 0;
        }

        // Gallery grew after the detail fetch — (re)start cycling through it.
        this.restartAutoPlay();
      },
      error: err => {
        console.warn('[ProductDetail] Could not load gallery images', err);
      },
    });
  }

  private unwrapDetail(res: unknown): Record<string, unknown> | null {
    if (!res || typeof res !== 'object') {
      return null;
    }

    const obj = res as Record<string, unknown>;
    const nested = obj['data'] ?? obj['Data'] ?? obj['result'] ?? obj['Result'] ?? obj['value'] ?? obj['Value'];
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      return nested as Record<string, unknown>;
    }

    return obj;
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
