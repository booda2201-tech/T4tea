import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiTeaware } from '../../models/api-catalog.model';

@Injectable({ providedIn: 'root' })
export class TeawaresApiService {
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.teawares;

  constructor(private http: HttpClient) {}

  getAll(): Observable<unknown> {
    return this.http.get<unknown>(`${this.base}${this.ep.getAll}`);
  }

  getById(id: string | number): Observable<ApiTeaware | unknown> {
    return this.http.get(`${this.base}${this.ep.getById}/${id}`);
  }
}
