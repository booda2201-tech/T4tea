import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiCategory } from '../../models/api-catalog.model';
import { ApiResponseHelper } from './api-response.helper';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.categories;

  constructor(
    private http: HttpClient,
    private apiHelper: ApiResponseHelper
  ) {}

  getAll(): Observable<ApiCategory[]> {
    return this.http.get<unknown>(`${this.base}${this.ep.getAll}`).pipe(
      map(res =>
        this.apiHelper.asArray<ApiCategory>(res).map(item => this.normalize(item)).filter(item => !!item.name)
      )
    );
  }

  private normalize(item: ApiCategory | Record<string, unknown>): ApiCategory {
    const raw = item as Record<string, unknown>;
    return {
      id: (raw['id'] ?? raw['Id']) as string | number | undefined,
      name: String(raw['name'] ?? raw['Name'] ?? '').trim(),
      description: String(raw['description'] ?? raw['Description'] ?? '').trim() || undefined,
      imageUrl: this.apiHelper.normalizeImageUrl(raw['imageUrl'] ?? raw['ImageUrl']) || undefined,
    };
  }
}
