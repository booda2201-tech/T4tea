import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { CatalogService } from './catalog.service';
import { OrdersService } from './orders.service';
import { ProfileApiService } from './profile-api.service';
import { WishlistService } from './wishlist.service';

/**
 * Single app bootstrap: catalog once + user data once after auth is ready.
 * Other services must not auto-sync on their own.
 */
@Injectable({ providedIn: 'root' })
export class AppDataService {
  private bootstrapped = false;
  private lastSyncedUserKey: string | null = null;

  constructor(
    private auth: AuthService,
    private catalog: CatalogService,
    private cart: CartService,
    private wishlist: WishlistService,
    private orders: OrdersService,
    private profileApi: ProfileApiService
  ) {}

  init(): void {
    if (this.bootstrapped) {
      return;
    }
    this.bootstrapped = true;

    this.catalog.ensureLoaded();

    this.auth.user$
      .pipe(
        distinctUntilChanged(
          (a, b) => (a?.id ?? a?.phone ?? null) === (b?.id ?? b?.phone ?? null)
        )
      )
      .subscribe(user => {
        if (!user) {
          this.lastSyncedUserKey = null;
          return;
        }

        const key = String(user.id ?? user.phone ?? '');
        if (key && key === this.lastSyncedUserKey) {
          return;
        }

        const runSync = (): void => {
          if (!this.auth.isLoggedIn()) {
            return;
          }
          this.lastSyncedUserKey = key;
          this.syncUserData();
        };

        const token = this.auth.getToken();
        if (token && this.auth.isTokenExpired(token) && this.auth.hasStoredCredentials()) {
          this.auth.silentRelogin().subscribe(() => runSync());
          return;
        }

        runSync();
      });
  }

  /** Force a one-shot refresh of signed-in user data (rare — e.g. after login). */
  syncUserData(): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.cart.syncFromApi();
    this.wishlist.syncFromApi();
    this.orders.syncFromApi();
    this.profileApi.syncAddresses();
  }
}
