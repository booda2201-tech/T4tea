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
      for (const key of ['data', 'items', 'result', 'results', 'value']) {
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

    const candidates = [
      item['imageUrls'],
      item['ImageUrls'],
      item['images'],
      item['Images'],
      item['imageUrl'],
      item['ImageUrl'],
      item['image'],
      item['Image'],
    ];

    const urls: string[] = [];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        for (const entry of candidate) {
          const url = this.normalizeImageUrl(entry);
          if (url) {
            urls.push(url);
          }
        }
      } else {
        const url = this.normalizeImageUrl(candidate);
        if (url) {
          urls.push(url);
        }
      }
    }

    return [...new Set(urls)];
  }

  normalizeImageUrl(value: unknown): string | null {
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const nested = obj['url'] ?? obj['Url'] ?? obj['imageUrl'] ?? obj['ImageUrl'];
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
