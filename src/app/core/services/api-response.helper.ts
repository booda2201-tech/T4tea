import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/** يوحّد ردود الـ API اللي بتيجي Array أو جوا data/items/result/value */
@Injectable({ providedIn: 'root' })
export class ApiResponseHelper {
  /** Any common raster/vector image extension — not used to reject, only to detect relative media paths. */
  private readonly imageExt =
    /\.(png|jpe?g|jfif|webp|gif|svg|avif|bmp|ico|heic|heif|tiff?|apng)(\?|#|$)/i;

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
      item['attachments'],
      item['Attachments'],
      item['media'],
      item['Media'],
      item['thumbnail'],
      item['Thumbnail'],
      item['thumbnailUrl'],
      item['ThumbnailUrl'],
      item['coverImage'],
      item['CoverImage'],
      item['coverUrl'],
      item['CoverUrl'],
      item['fileName'],
      item['FileName'],
      item['filePath'],
      item['FilePath'],
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

  /**
   * Accepts any image type the browser can show (png/jpg/jpeg/webp/gif/svg/avif/bmp/heic/base64…).
   * Does not filter by extension — only normalizes the URL/path.
   */
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
        obj['fileName'] ??
        obj['FileName'] ??
        obj['src'] ??
        obj['Src'] ??
        obj['thumbnail'] ??
        obj['Thumbnail'];
      return this.normalizeImageUrl(nested);
    }

    if (typeof value !== 'string') {
      return null;
    }

    let trimmed = value.trim().replace(/\\/g, '/');
    if (!trimmed) {
      return null;
    }

    // Protocol-relative CDN URLs
    if (trimmed.startsWith('//')) {
      return `https:${trimmed}`;
    }

    // Absolute / data / blob / local assets — any mime/extension allowed
    if (
      /^https?:\/\//i.test(trimmed) ||
      /^data:image\//i.test(trimmed) ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:') ||
      trimmed.startsWith('assets/')
    ) {
      return trimmed;
    }

    // Bare base64 payload without data: prefix
    if (/^[A-Za-z0-9+/=\s]+$/.test(trimmed) && trimmed.replace(/\s/g, '').length > 128) {
      return `data:image/*;base64,${trimmed.replace(/\s/g, '')}`;
    }

    trimmed = trimmed.replace(/^\.\//, '');

    // Relative media path → root-relative
    if (!trimmed.startsWith('/')) {
      const looksLikeMedia =
        /^(uploads?|images?|media|files|content|wwwroot|static)\//i.test(trimmed) ||
        this.imageExt.test(trimmed);
      if (looksLikeMedia) {
        trimmed = `/${trimmed}`;
      } else {
        // Unknown relative string — still return it (no format rejection)
        return trimmed;
      }
    }

    // Strip accidental wwwroot prefix used by some ASP.NET hosts
    trimmed = trimmed.replace(/^\/wwwroot\//i, '/');

    const mediaBase = (environment.mediaBaseUrl || environment.apiBaseUrl || '').replace(/\/$/, '');
    if (mediaBase) {
      return `${mediaBase}${trimmed}`;
    }

    return trimmed;
  }
}
