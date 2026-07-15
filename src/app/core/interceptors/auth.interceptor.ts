import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

const RETRIED_HEADER = 'X-Auth-Retried';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApi = req.url.includes('/api/');
    const isAuthEndpoint = /\/api\/Auth\//i.test(req.url);

    if (!isApi || isAuthEndpoint) {
      return next.handle(this.withAuthHeaders(req));
    }

    // Token already expired? Refresh it silently before the request goes out.
    if (this.auth.getToken() && this.auth.isTokenExpired() && this.auth.hasStoredCredentials()) {
      return this.auth.silentRelogin().pipe(
        switchMap(() => this.handleWithRetry(req, next))
      );
    }

    return this.handleWithRetry(req, next);
  }

  /** Send the request; on 401, re-login once in the background and retry. */
  private handleWithRetry(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.withAuthHeaders(req)).pipe(
      catchError((err: HttpErrorResponse) => {
        const unauthorized =
          err.status === 401 ||
          err.status === 302 ||
          (typeof err.url === 'string' && /\/Login(\?|$)/i.test(err.url));

        const alreadyRetried = req.headers.has(RETRIED_HEADER);

        if (unauthorized && !alreadyRetried && this.auth.hasStoredCredentials()) {
          return this.auth.silentRelogin().pipe(
            switchMap(ok => {
              if (!ok) {
                this.router.navigate(['/login']);
                return throwError(() => err);
              }
              const retried = req.clone({ setHeaders: { [RETRIED_HEADER]: '1' } });
              return next.handle(this.withAuthHeaders(retried));
            })
          );
        }

        if (unauthorized && this.auth.getToken() && !this.auth.hasStoredCredentials()) {
          this.auth.clearSession();
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }

  private withAuthHeaders(req: HttpRequest<unknown>): HttpRequest<unknown> {
    if (!req.url.includes('/api/')) {
      return req;
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const token = this.auth.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return req.clone({ setHeaders: headers });
  }
}
