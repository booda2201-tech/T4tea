import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AddressPayload, UserAddress, UserProfile } from '../../models/profile.model';
import { ApiResponseHelper } from './api-response.helper';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly base = environment.apiBaseUrl;
  private readonly ep = environment.apiEndpoints.profile;
  private lastProfile: UserProfile | null = null;

  private readonly addressesSubject = new BehaviorSubject<UserAddress[]>([]);
  private readonly addressesLoadedSubject = new BehaviorSubject<boolean>(false);
  private addressesSyncInFlight: Observable<UserAddress[]> | null = null;

  readonly addresses$ = this.addressesSubject.asObservable();
  readonly addressesLoaded$ = this.addressesLoadedSubject.asObservable();

  get addresses(): UserAddress[] {
    return this.addressesSubject.value;
  }

  findAddressById(id: string | number | null | undefined): UserAddress | null {
    if (id == null || id === '') {
      return null;
    }

    const needle = String(id);
    return this.addressesSubject.value.find(item => String(item.id) === needle) ?? null;
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private apiHelper: ApiResponseHelper
  ) {
    // AppDataService owns sync-on-login — here we only clear on logout.
    this.auth.user$
      .pipe(distinctUntilChanged((a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)))
      .subscribe(user => {
        if (!user) {
          this.addressesSubject.next([]);
          this.addressesLoadedSubject.next(true);
          this.addressesSyncInFlight = null;
        }
      });
  }

  get(): Observable<UserProfile | null> {
    if (!this.auth.isLoggedIn()) {
      return of(null);
    }

    return this.http.get<unknown>(`${this.base}${this.ep.get}`).pipe(
      map(res => this.unwrapProfile(res)),
      tap(profile => {
        this.lastProfile = profile;
        this.applyProfileToSession(profile);
      }),
      catchError(err => {
        console.error('[Profile] GetProfile failed', err);
        return of(null);
      })
    );
  }

  /** Postman body: { fullName, phone } */
  update(payload: { fullName: string; phone: string }): Observable<UserProfile> {
    const body: Record<string, string> = {
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
    };

    return this.http.put<unknown>(`${this.base}${this.ep.update}`, body).pipe(
      // Merge the submitted fields last so the session reflects the change
      // even when the backend response omits them (e.g. email).
      map(res => ({ ...(this.unwrapProfile(res) ?? this.lastProfile ?? {}), ...body } as UserProfile)),
      tap(profile => {
        this.lastProfile = profile;
        this.applyProfileToSession(profile);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('[Profile] UpdateProfile failed', err.status, err.error);
        return throwError(() => err);
      })
    );
  }

  getAddresses(): Observable<UserAddress[]> {
    if (!this.auth.isLoggedIn()) {
      return of([]);
    }

    const cached = this.addressesSubject.value;
    if (cached.length > 0) {
      this.syncAddresses();
      return of(cached);
    }

    this.syncAddresses();
    return this.addresses$;
  }

  /** Fetch addresses from API and keep an in-memory cache (deduped in-flight). */
  syncAddresses(): void {
    if (!this.auth.isLoggedIn() || this.addressesSyncInFlight) {
      return;
    }

    this.addressesSyncInFlight = this.http
      .get<unknown>(`${this.base}${this.ep.addresses.getAll}`)
      .pipe(
        map(res => this.apiHelper.asArray<UserAddress>(res).map(item => this.normalizeAddress(item))),
        tap(list => {
          this.addressesSubject.next(list);
          this.addressesLoadedSubject.next(true);
        }),
        catchError(err => {
          console.error('[Profile] GetAddresses failed', err);
          this.addressesLoadedSubject.next(true);
          return of(this.addressesSubject.value);
        }),
        finalize(() => {
          this.addressesSyncInFlight = null;
        }),
        shareReplay(1)
      );

    this.addressesSyncInFlight.subscribe();
  }

  private setCachedAddresses(next: UserAddress[]): void {
    this.addressesSubject.next(next);
    this.addressesLoadedSubject.next(true);
  }

  getAddress(id: string | number): Observable<UserAddress | null> {
    return this.http.get<unknown>(`${this.base}${this.ep.addresses.getById}/${id}`).pipe(
      map(res => this.normalizeAddress(this.unwrapAddress(res))),
      catchError(() => of(null))
    );
  }

  /** Postman: POST /api/Profile/addresses/AddAddress */
  addAddress(payload: AddressPayload): Observable<UserAddress> {
    const body = this.toApiAddressBody(payload);
    return this.http.post<unknown>(`${this.base}${this.ep.addresses.add}`, body).pipe(
      map(res => this.normalizeAddress(this.unwrapAddress(res) || body)),
      tap(saved => {
        const without = this.addressesSubject.value.filter(item => item.id !== saved.id);
        this.setCachedAddresses([...without, saved]);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('[Profile] AddAddress failed', err.status, err.error);
        return throwError(() => err);
      })
    );
  }

  updateAddress(id: string | number, payload: AddressPayload): Observable<UserAddress> {
    const body = this.toApiAddressBody({ ...payload, id });
    return this.http.put<unknown>(`${this.base}${this.ep.addresses.update}/${id}`, body).pipe(
      map(res => this.normalizeAddress(this.unwrapAddress(res) || body)),
      tap(saved => {
        const next = this.addressesSubject.value.map(item => (item.id === saved.id ? saved : item));
        this.setCachedAddresses(next);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('[Profile] UpdateAddress failed', err.status, err.error);
        return throwError(() => err);
      })
    );
  }

  deleteAddress(id: string | number): Observable<boolean> {
    return this.http.delete(`${this.base}${this.ep.addresses.delete}/${id}`).pipe(
      map(() => true),
      tap(() => {
        this.setCachedAddresses(this.addressesSubject.value.filter(item => item.id !== id));
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('[Profile] DeleteAddress failed', err.status, err.error);
        return throwError(() => err);
      })
    );
  }

  private toApiAddressBody(payload: AddressPayload): Record<string, unknown> {
    const userId = payload.userId ?? this.auth.getUserId();
    const body: Record<string, unknown> = {
      label: payload.label,
      street: payload.street,
      city: payload.city,
      governorate: payload.governorate,
      postalCode: payload.postalCode || '',
      notes: payload.notes || '',
    };

    if (payload.id != null) {
      body['id'] = payload.id;
    }
    if (userId) {
      body['userId'] = String(userId);
    }

    return body;
  }

  private unwrapProfile(res: unknown): UserProfile | null {
    if (!res) {
      return null;
    }

    if (typeof res === 'object') {
      const obj = res as Record<string, unknown>;
      const nested = obj['data'] ?? obj['result'] ?? obj['value'] ?? obj['profile'];
      if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
        return nested as UserProfile;
      }
      return obj as UserProfile;
    }

    return null;
  }

  private unwrapAddress(res: unknown): UserAddress {
    if (!res || typeof res !== 'object') {
      return {};
    }

    const obj = res as Record<string, unknown>;
    const nested = obj['data'] ?? obj['result'] ?? obj['value'];
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      return nested as UserAddress;
    }

    return obj as UserAddress;
  }

  private normalizeAddress(item: UserAddress): UserAddress {
    const rawId = item.id ?? item['Id'];
    const id = typeof rawId === 'string' || typeof rawId === 'number' ? rawId : undefined;
    const label = String(item.label ?? item['Label'] ?? item.fullName ?? '');
    const street = String(item.street ?? item['Street'] ?? item.address ?? '');

    return {
      ...item,
      id,
      label,
      street,
      city: String(item.city ?? item['City'] ?? ''),
      governorate: String(item.governorate ?? item['Governorate'] ?? ''),
      postalCode: String(item.postalCode ?? item['PostalCode'] ?? ''),
      notes: String(item.notes ?? item['Notes'] ?? ''),
      userId: (item.userId ?? item['UserId']) as string | number | undefined,
      fullName: label,
      address: street,
    };
  }

  private applyProfileToSession(profile: UserProfile | null): void {
    if (!profile) {
      return;
    }

    const name = String(profile.fullName || profile.userName || profile.name || '');
    const phone = String(profile.phone || profile.phoneNumber || '');
    const email = String(profile.email || '');

    this.auth.updateLocalUser({
      id: profile.id ?? (profile['userId'] as string | number | undefined),
      name: name || this.auth.currentUser?.name || 'Guest',
      email: email || this.auth.currentUser?.email || '',
      phone: phone || this.auth.currentUser?.phone,
      userName: name || this.auth.currentUser?.userName,
    });
  }
}
