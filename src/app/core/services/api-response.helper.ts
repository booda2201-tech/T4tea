import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/** يوحّد ردود الـ API اللي بتيجي Array أو جوا data/items/result/value */
@Injectable({ providedIn: 'root' })
export class ApiResponseHelper {
  asArray<T>(payload: unknown): T[] {
    if (Array.isArray(payload)) {
      return payload as T[];
    }

    if (payload && typeof payload === 'object') {
      const obj = payload as Record<string, unknown>;
      for (const key of [
        'data',
        'Data',
        'items',
        'Items',
        'orders',
        'Orders',
        'result',
        'Result',
        'results',
        'Results',
        'value',
        'Value',
        'myOrders',
        'MyOrders',
      ]) {
        if (Array.isArray(obj[key])) {
          return obj[key] as T[];
        }
      }
    }

    return [];
  }

  extractImageUrls(item: Record<string, unknown> | null | undefined): string[] {
    if (!item) {
      return [];
    }

    // Prefer the Postman contract field first: imageUrls: string[]
    const preferred = item['imageUrls'] ?? item['ImageUrls'];
    if (Array.isArray(preferred) && preferred.length) {
      return this.collectImageUrls(preferred);
    }

    const candidates = [
      item['images'],
      item['Images'],
      item['productImages'],
      item['ProductImages'],
      item['teawareImages'],
      item['TeawareImages'],
      item['gallery'],
      item['Gallery'],
      item['files'],
      item['Files'],
      item['imageUrl'],
      item['ImageUrl'],
      item['image'],
      item['Image'],
    ];

    const urls: string[] = [];
    for (const candidate of candidates) {
      urls.push(...this.collectImageUrls(candidate));
    }

    return [...new Set(urls)];
  }

  private collectImageUrls(value: unknown): string[] {
    if (value == null) {
      return [];
    }

    if (Array.isArray(value)) {
      const urls: string[] = [];
      for (const entry of value) {
        const url = this.normalizeImageUrl(entry);
        if (url) {
          urls.push(url);
        }
      }
      return [...new Set(urls)];
    }

    const single = this.normalizeImageUrl(value);
    return single ? [single] : [];
  }

  normalizeImageUrl(value: unknown): string | null {
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const nested =
        obj['url'] ??
        obj['Url'] ??
        obj['imageUrl'] ??
        obj['ImageUrl'] ??
        obj['path'] ??
        obj['Path'] ??
        obj['filePath'] ??
        obj['FilePath'] ??
        obj['src'] ??
        obj['Src'];
      return this.normalizeImageUrl(nested);
    }

    if (typeof value !== 'string') {
      return null;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:') ||
      trimmed.startsWith('assets/')
    ) {
      return trimmed;
    }

    if (trimmed.startsWith('/')) {
      return `${environment.apiBaseUrl || ''}${trimmed}`;
    }

    return trimmed;
  }
}
