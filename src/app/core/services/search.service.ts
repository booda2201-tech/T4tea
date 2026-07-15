import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatalogService } from './catalog.service';
import { SearchResult } from '../../models/search-result.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenSubject.asObservable();

  constructor(private catalogService: CatalogService) {
    this.catalogService.ensureLoaded();
  }

  get isOpen(): boolean {
    return this.isOpenSubject.value;
  }

  openSearch(): void {
    this.isOpenSubject.next(true);
  }

  closeSearch(): void {
    this.isOpenSubject.next(false);
  }

  toggleSearch(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  search(query: string): SearchResult[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    const teaResults: SearchResult[] = this.catalogService.products
      .filter(product => this.matchesProduct(product, normalized))
      .map(product => ({
        id: product.id,
        title: product.title,
        type: product.type,
        price: product.price,
        image: product.image,
        category: 'tea',
      }));

    const teawareResults: SearchResult[] = this.catalogService.teawares
      .filter(item => this.matchesTeaware(item, normalized))
      .map(item => ({
        id: item.id,
        title: item.title,
        type: item.type,
        price: item.price,
        image: item.image,
        category: 'teaware',
      }));

    return [...teaResults, ...teawareResults];
  }

  private matchesProduct(
    product: { title: string; type: string; flavorProfile?: string; mood?: string; caffeine?: string; description: string },
    query: string
  ): boolean {
    return [
      product.title,
      product.type,
      product.flavorProfile,
      product.mood,
      product.caffeine,
      product.description,
    ].some(value => value?.toLowerCase().includes(query));
  }

  private matchesTeaware(
    item: { title: string; type: string; description: string },
    query: string
  ): boolean {
    return [item.title, item.type, item.description].some(value =>
      value.toLowerCase().includes(query)
    );
  }
}
