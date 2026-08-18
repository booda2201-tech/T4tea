import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { CategoriesApiService } from '../../core/services/categories-api.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { isComingSoon } from '../../shared/utils/coming-soon.util';
import { Product } from '../../models/product.model';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categoryHeroVideo') categoryHeroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('sortDropdown') sortDropdown!: ElementRef<HTMLElement>;
  @ViewChild('catalogSection') catalogSection?: ElementRef<HTMLElement>;

  products: Product[] = [];
  isSortOpen = false;
  selectedSort = 'featured';
  selectedFilters: string[] = [];
  isLoading = false;
  currentPage = 1;
  readonly pageSize = 9;

  /** Category pills — loaded from GET /api/Categories/GetAllCategories only. */
  typeOptions: string[] = [];

  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  private subs = new Subscription();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService,
    private categoriesApi: CategoriesApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();
    this.loadCategories();

    this.subs.add(
      this.catalogService.products$.subscribe(products => {
        this.products = products;
        // If categories API is empty/slow, derive names from products as fallback.
        if (!this.typeOptions.length) {
          this.syncTypeOptionsFromProducts(products);
        }
        this.ensureValidPage();
        this.refreshListAnimations();
      })
    );

    this.subs.add(
      this.catalogService.loading$.subscribe(loading => {
        this.isLoading = loading;
      })
    );

    this.subs.add(
      this.route.queryParamMap.subscribe(params => {
        const type = params.get('type');
        if (!type) {
          return;
        }

        const nonType = this.selectedFilters.filter(f => !this.hasTypeOption(f));
        this.selectedFilters = [...nonType, type];
        this.resetToFirstPage();
      })
    );
  }

  ngAfterViewInit(): void {
    gsap.from('.shop-hero__content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });

    const video = this.categoryHeroVideo?.nativeElement;
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
    this.subs.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.isSortOpen && this.sortDropdown && !this.sortDropdown.nativeElement.contains(target)) {
      this.isSortOpen = false;
    }
  }

  get selectedSortLabel(): string {
    return this.sortOptions.find(option => option.value === this.selectedSort)?.label ?? 'Featured';
  }

  get activeTypeFilter(): string | null {
    return this.selectedFilters.find(filter => this.hasTypeOption(filter)) ?? null;
  }

  get filteredProducts(): Product[] {
    const selectedTypes = this.selectedFilters.filter(filter => this.hasTypeOption(filter));

    if (!selectedTypes.length) {
      return this.products;
    }

    return this.products.filter(product =>
      selectedTypes.some(type => this.typesMatch(type, product.type))
    );
  }

  get sortedProducts(): Product[] {
    const list = [...this.filteredProducts];

    switch (this.selectedSort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => Number(b.id) - Number(a.id) || b.id.localeCompare(a.id));
      default:
        return list;
    }
  }

  get pagedProducts(): Product[] {
    const page = Math.min(Math.max(this.currentPage, 1), this.totalPages);
    const start = (page - 1) * this.pageSize;
    return this.sortedProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.sortedProducts.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  toggleSortDropdown(): void {
    this.isSortOpen = !this.isSortOpen;
  }

  selectSort(value: string): void {
    this.selectedSort = value;
    this.isSortOpen = false;
    this.resetToFirstPage();
  }

  isTypeActive(type: string): boolean {
    return this.selectedFilters.includes(type);
  }

  toggleTypeFilter(type: string, event?: Event): void {
    event?.preventDefault();
    const withoutTypes = this.selectedFilters.filter(filter => !this.hasTypeOption(filter));
    if (this.selectedFilters.includes(type)) {
      this.selectedFilters = withoutTypes;
    } else {
      this.selectedFilters = [...withoutTypes, type];
    }
    this.resetToFirstPage();
  }

  clearTypeFilters(event?: Event): void {
    event?.preventDefault();
    this.selectedFilters = this.selectedFilters.filter(filter => !this.hasTypeOption(filter));
    this.resetToFirstPage();
  }

  toggleFilter(value: string): void {
    if (this.selectedFilters.includes(value)) {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== value);
    } else {
      this.selectedFilters = [...this.selectedFilters, value];
    }
    this.resetToFirstPage();
  }

  clearAllFilters(): void {
    this.selectedFilters = [];
    this.resetToFirstPage();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.scrollToCatalog();
    this.refreshListAnimations();
  }

  trackByProductId(_index: number, product: Product): string {
    return product.id;
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
    if (isComingSoon(product.price)) {
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

  private loadCategories(): void {
    this.subs.add(
      this.categoriesApi.getAll().subscribe({
        next: categories => {
          const names = [...new Set(categories.map(item => item.name).filter(Boolean))];
          if (names.length) {
            this.typeOptions = names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            return;
          }
          this.syncTypeOptionsFromProducts(this.products);
        },
        error: err => {
          console.warn('[Shop] Categories API failed — using product categories', err);
          this.syncTypeOptionsFromProducts(this.products);
        },
      })
    );
  }

  private hasTypeOption(value: string): boolean {
    return this.typeOptions.some(option => this.typesMatch(option, value));
  }

  private typesMatch(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  private resetToFirstPage(): void {
    this.currentPage = 1;
    this.refreshListAnimations();
  }

  private ensureValidPage(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
  }

  private scrollToCatalog(): void {
    this.catalogSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private refreshListAnimations(): void {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }

  private syncTypeOptionsFromProducts(products: Product[]): void {
    const fromProducts = [...new Set(products.map(p => p.type).filter(Boolean))];
    if (fromProducts.length) {
      this.typeOptions = fromProducts.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }
  }
}
