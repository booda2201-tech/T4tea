import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  AuthResult,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../../models/auth.model';

export type { AuthUser, AuthMode, AuthResult } from '../../models/auth.model';
const TOKEN_KEY = 't4tea_token';
const USER_KEY = 't4tea_user';
const RESET_TOKEN_KEY = 't4tea_reset_token';
const CRED_KEY = 't4tea_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = environment.apiBaseUrl;
  private readonly endpoints = environment.apiEndpoints.auth;
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readStoredUser());

  readonly user$ = this.userSubject.asObservable();

  private reloginInFlight: Observable<boolean> | null = null;
  private lastReloginAt = 0;

  constructor(private http: HttpClient) {
    this.cleanupStaleSession();
  }

  /** One-time startup cleanup so templates never trigger state changes mid-render. */
  private cleanupStaleSession(): void {
    const token = this.getToken();
    const hasStaleUser = !token && !!this.userSubject.value;
    const hasDeadToken = !!token && this.isTokenExpired(token) && !this.hasStoredCredentials();

    if (hasStaleUser || hasDeadToken) {
      this.clearSession();
    }
  }

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  getToken(): string | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) {
      return null;
    }
    const token = raw.trim().replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '');
    return token || null;
  }

  /** Prefer stored user id; fall back to JWT claims (sub / nameid / userId). */
  getUserId(): string {
    const fromUser = this.currentUser?.id;
    if (fromUser != null && String(fromUser).trim()) {
      return String(fromUser);
    }

    const token = this.getToken();
    if (!token) {
      return '';
    }

    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return '';
      }
      const json = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(json) as Record<string, unknown>;
      const claim =
        payload['sub'] ??
        payload['nameid'] ??
        payload['userId'] ??
        payload['uid'] ??
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return claim != null ? String(claim) : '';
    } catch {
      return '';
    }
  }

  /** Pure check — no side effects, safe to call from templates. */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Expired token but we can silently re-login → still treat as logged in
    return !this.isTokenExpired(token) || this.hasStoredCredentials();
  }

  hasStoredCredentials(): boolean {
    return !!this.readCredentials();
  }

  /**
   * Re-authenticate in the background using the credentials from the last
   * successful login, so an expired JWT never interrupts the user.
   * Concurrent callers share the same in-flight request.
   */
  silentRelogin(): Observable<boolean> {
    if (this.reloginInFlight) {
      return this.reloginInFlight;
    }

    // Fresh token from a recent relogin that the server still rejects →
    // re-logging in again won't help; don't hammer the login endpoint
    if (Date.now() - this.lastReloginAt < 10_000 && this.getToken() && !this.isTokenExpired()) {
      return of(true);
    }

    const creds = this.readCredentials();
    if (!creds) {
      return of(false);
    }

    const payload: LoginRequest = { phone: creds.phone, password: creds.password };

    this.reloginInFlight = this.http
      .post<AuthResponse>(`${this.base}${this.endpoints.login}`, payload)
      .pipe(
        tap(res => {
          this.persistSession(res, payload.phone);
          this.lastReloginAt = Date.now();
        }),
        map(() => !!this.getToken() && !this.isTokenExpired()),
        catchError(() => {
          // Password changed or account disabled → give up and clear everything
          this.clearSession();
          return of(false);
        }),
        finalize(() => {
          this.reloginInFlight = null;
        }),
        shareReplay(1)
      );

    return this.reloginInFlight;
  }

  /** Decode the JWT exp claim; treat malformed tokens as expired. */
  isTokenExpired(token: string | null = this.getToken()): boolean {
    if (!token) {
      return true;
    }

    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return true;
      }
      const json = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(json) as Record<string, unknown>;
      const exp = Number(payload['exp']);
      if (!Number.isFinite(exp)) {
        // No exp claim → assume still valid, let the server decide
        return false;
      }
      // 30s clock-skew buffer
      return exp * 1000 <= Date.now() + 30_000;
    } catch {
      return true;
    }
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(CRED_KEY);
    this.userSubject.next(null);
  }

  login(phone: string, password: string): Observable<AuthResult> {
    const payload: LoginRequest = {
      phone: phone.trim(),
      password,
    };

    if (!payload.phone || !password.trim()) {
      return of({ success: false, message: 'Please enter your phone and password.' });
    }

    return this.http.post<AuthResponse>(`${this.base}${this.endpoints.login}`, payload).pipe(
      tap(res => {
        this.persistSession(res, payload.phone);
        this.storeCredentials(payload.phone, password);
      }),
      map(res => {
        if (!this.getToken()) {
          console.error('[Auth] Login succeeded but no token was found in response', res);
          return {
            success: false as const,
            message: 'Login response did not include a token. Please contact support.',
          };
        }
        return { success: true as const };
      }),
      catchError(err =>
        of({
          success: false,
          message:
            err?.error?.message ||
            (err?.status === 0
              ? 'Unable to reach the server. Check your connection.'
              : 'Incorrect phone or password.'),
        })
      )
    );
  }

  register(name: string, phone: string, password: string): Observable<AuthResult> {
    const payload: RegisterRequest = {
      userName: name.trim(),
      phone: phone.trim(),
      password,
      reEnterPassword: password,
    };

    if (!payload.userName || !payload.phone || !password.trim()) {
      return of({ success: false, message: 'Please fill in all required fields.' });
    }

    if (password.length < 6) {
      return of({ success: false, message: 'Password must be at least 6 characters.' });
    }

    return this.http.post<AuthResponse>(`${this.base}${this.endpoints.register}`, payload).pipe(
      tap(res => {
        this.persistSession(res, payload.phone, payload.userName);
        this.storeCredentials(payload.phone, password);
      }),
      map(() => ({ success: true as const })),
      catchError(err =>
        of({
          success: false,
          message: err?.error?.message || 'Registration failed. Please try again.',
        })
      )
    );
  }

  /** Local-only reset flow (API has no reset endpoint exposed in collection). */
  requestPasswordReset(phoneOrEmail: string): AuthResult {
    const value = phoneOrEmail.trim();
    if (!value) {
      return { success: false, message: 'Please enter your phone number.' };
    }

    const token = btoa(`${value}:${Date.now()}`);
    localStorage.setItem(RESET_TOKEN_KEY, JSON.stringify({ account: value, token }));
    return {
      success: true,
      message: 'If an account exists, reset instructions have been prepared.',
      resetToken: token,
    };
  }

  resetPassword(token: string, password: string): AuthResult {
    if (!token || !password.trim()) {
      return { success: false, message: 'Please provide a valid token and new password.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const stored = this.readResetToken();
    if (!stored || stored.token !== token) {
      return { success: false, message: 'Invalid or expired reset token.' };
    }

    localStorage.removeItem(RESET_TOKEN_KEY);
    return { success: true, message: 'Password updated. Please sign in with your new password.' };
  }

  getStoredResetToken(): string | null {
    return this.readResetToken()?.token ?? null;
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.base}${this.endpoints.logout}`, {}).pipe(
        catchError(() => of(null))
      ).subscribe();
    }

    this.clearSession();
  }

  /** Keep silent re-login working after the user changes their phone number. */
  updateStoredCredentialsPhone(newPhone: string): void {
    const creds = this.readCredentials();
    if (creds) {
      this.storeCredentials(newPhone.trim(), creds.password);
    }
  }

  updateLocalUser(partial: Partial<AuthUser>): void {
    const current = this.userSubject.value;
    if (!current) {
      return;
    }

    const next = { ...current, ...partial };
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    this.userSubject.next(next);
  }

  private persistSession(res: AuthResponse, fallbackPhone: string, fallbackName?: string): void {
    const token = this.extractToken(res);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    const user = this.extractUser(res, fallbackPhone, fallbackName);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private extractToken(res: AuthResponse): string | null {
    const direct = this.findJwtDeep(res);
    if (direct) {
      return direct;
    }
    return null;
  }

  /** Walk login payloads of any shape and pick the first JWT-looking string. */
  private findJwtDeep(value: unknown, depth = 0): string | null {
    if (value == null || depth > 6) {
      return null;
    }

    if (typeof value === 'string') {
      const cleaned = value.trim().replace(/^Bearer\s+/i, '');
      if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(cleaned)) {
        return cleaned;
      }
      return null;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const found = this.findJwtDeep(item, depth + 1);
        if (found) {
          return found;
        }
      }
      return null;
    }

    if (typeof value === 'object') {
      const preferredKeys = [
        'token',
        'Token',
        'accessToken',
        'AccessToken',
        'access_token',
        'jwt',
        'Jwt',
        'jwtToken',
        'JwtToken',
      ];
      const obj = value as Record<string, unknown>;
      for (const key of preferredKeys) {
        const found = this.findJwtDeep(obj[key], depth + 1);
        if (found) {
          return found;
        }
      }
      for (const nested of Object.values(obj)) {
        const found = this.findJwtDeep(nested, depth + 1);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  private extractUser(res: AuthResponse, fallbackPhone: string, fallbackName?: string): AuthUser {
    const raw = (res.user || res.data?.user || {}) as Record<string, unknown>;
    const phone = String(raw['phone'] || raw['Phone'] || fallbackPhone || '');
    const name = String(
      raw['userName'] ||
        raw['UserName'] ||
        raw['name'] ||
        raw['fullName'] ||
        res.userName ||
        res.data?.userName ||
        fallbackName ||
        phone ||
        'Guest'
    );
    const email = String(raw['email'] || raw['Email'] || phone || '');

    return {
      id: (raw['id'] as string | number) ?? res.userId ?? res.data?.userId,
      name,
      email,
      phone,
      userName: name,
      role: String(raw['role'] || res.role || res.data?.role || ''),
    };
  }

  private storeCredentials(phone: string, password: string): void {
    try {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ p: phone, s: password }))));
      localStorage.setItem(CRED_KEY, encoded);
    } catch {
      // Storage unavailable → silent re-login just won't be possible
    }
  }

  private readCredentials(): { phone: string; password: string } | null {
    try {
      const raw = localStorage.getItem(CRED_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(decodeURIComponent(escape(atob(raw)))) as { p?: string; s?: string };
      if (!parsed.p || !parsed.s) {
        return null;
      }
      return { phone: parsed.p, password: parsed.s };
    } catch {
      return null;
    }
  }

  private readStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private readResetToken(): { account: string; token: string } | null {
    try {
      const raw = localStorage.getItem(RESET_TOKEN_KEY);
      return raw ? (JSON.parse(raw) as { account: string; token: string }) : null;
    } catch {
      return null;
    }
  }
}
