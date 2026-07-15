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
import { CartService } from '../../core/services/cart.service';
import { CatalogService } from '../../core/services/catalog.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { pulseWishlistButton } from '../../shared/utils/wishlist-pulse.util';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categoryHeroVideo') categoryHeroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('sortDropdown') sortDropdown!: ElementRef<HTMLElement>;
  @ViewChild('refineDropdown') refineDropdown!: ElementRef<HTMLElement>;

  products: Product[] = [];
  isRefineOpen = false;
  isSortOpen = false;
  selectedSort = 'featured';
  selectedFilters: string[] = [];
  isLoading = false;

  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  typeOptions: string[] = ['Black Tea', 'Green Tea', 'Herbal Tea', 'Oolong Tea'];
  flavorOptions = ['Floral', 'Spiced', 'Citrus', 'Earthy', 'Minty', 'Fruity'];
  moodOptions = ['Calm', 'Energize', 'Focus', 'Digest'];
  caffeineOptions = ['None', 'Low', 'Medium', 'High'];

  private subs = new Subscription();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private catalogService: CatalogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();

    this.subs.add(
      this.catalogService.products$.subscribe(products => {
        this.products = products;
        this.syncTypeOptions(products);
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

        const nonType = this.selectedFilters.filter(f => !this.typeOptions.includes(f));
        this.selectedFilters = [...nonType, type];
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
    return this.selectedFilters.find(filter => this.typeOptions.includes(filter)) ?? null;
  }

  get refineFilterCount(): number {
    return this.selectedFilters.filter(
      filter =>
        this.flavorOptions.includes(filter) ||
        this.moodOptions.includes(filter) ||
        this.caffeineOptions.includes(filter)
    ).length;
  }

  get filteredProducts(): Product[] {
    const selectedTypes = this.selectedFilters.filter(filter => this.typeOptions.includes(filter));
    const selectedFlavors = this.selectedFilters.filter(filter => this.flavorOptions.includes(filter));
    const selectedMoods = this.selectedFilters.filter(filter => this.moodOptions.includes(filter));
    const selectedCaffeine = this.selectedFilters.filter(filter => this.caffeineOptions.includes(filter));

    return this.products.filter(product => {
      if (selectedTypes.length && !selectedTypes.includes(product.type)) {
        return false;
      }

      if (selectedFlavors.length && !selectedFlavors.includes(product.flavorProfile ?? '')) {
        return false;
      }

      if (selectedMoods.length && !selectedMoods.includes(product.mood ?? '')) {
        return false;
      }

      if (selectedCaffeine.length && !selectedCaffeine.includes(product.caffeine ?? '')) {
        return false;
      }

      return true;
    });
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

  toggleSortDropdown(): void {
    this.isSortOpen = !this.isSortOpen;
  }

  selectSort(value: string): void {
    this.selectedSort = value;
    this.isSortOpen = false;
  }

  toggleRefine(): void {
    this.isRefineOpen = !this.isRefineOpen;
    if (this.isRefineOpen) {
      this.isSortOpen = false;
    }
  }

  closeRefine(): void {
    this.isRefineOpen = false;
  }

  clearRefineFilters(): void {
    this.selectedFilters = this.selectedFilters.filter(filter => this.typeOptions.includes(filter));
  }

  isTypeActive(type: string): boolean {
    return this.selectedFilters.includes(type);
  }

  toggleTypeFilter(type: string, event?: Event): void {
    event?.preventDefault();
    const withoutTypes = this.selectedFilters.filter(filter => !this.typeOptions.includes(filter));
    if (this.selectedFilters.includes(type)) {
      this.selectedFilters = withoutTypes;
    } else {
      this.selectedFilters = [...withoutTypes, type];
    }
  }

  clearTypeFilters(event?: Event): void {
    event?.preventDefault();
    this.selectedFilters = this.selectedFilters.filter(filter => !this.typeOptions.includes(filter));
  }

  toggleFilter(value: string): void {
    if (this.selectedFilters.includes(value)) {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== value);
    } else {
      this.selectedFilters = [...this.selectedFilters, value];
    }
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
      name: product.title,
      type: product.type,
      price: product.price,
      image: product.image,
    });
  }

  private syncTypeOptions(products: Product[]): void {
    const fromApi = [...new Set(products.map(p => p.type).filter(Boolean))];
    if (fromApi.length) {
      this.typeOptions = fromApi.sort((a, b) => a.localeCompare(b));
    }
  }
}
