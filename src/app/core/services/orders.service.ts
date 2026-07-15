import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { AuthService } from './auth.service';

const ORDERS_KEY = 't4tea_orders';

/**
 * The backend has no Orders endpoint, so orders placed at checkout are
 * kept in localStorage, scoped per user id.
 */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private ordersSubject = new BehaviorSubject<Order[]>(this.readOrders());

  readonly orders$ = this.ordersSubject.asObservable();
  readonly ordersCount$ = this.orders$.pipe(map(orders => orders.length));

  constructor(private auth: AuthService) {}

  get orders(): Order[] {
    return this.ordersSubject.value;
  }

  /** Reload orders for the currently signed-in user (call on profile init). */
  refresh(): void {
    this.ordersSubject.next(this.readOrders());
  }

  placeOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const newOrder: Order = {
      ...order,
      id: this.generateOrderId(),
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    const next = [newOrder, ...this.readOrders()];
    this.persist(next);
    this.ordersSubject.next(next);
    return newOrder;
  }

  private generateOrderId(): string {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `T4-${stamp}${rand}`;
  }

  private storageKeyForUser(): string {
    const userId = this.auth.getUserId();
    return userId ? `${ORDERS_KEY}_${userId}` : ORDERS_KEY;
  }

  private readOrders(): Order[] {
    try {
      const raw = localStorage.getItem(this.storageKeyForUser());
      const parsed = raw ? (JSON.parse(raw) as Order[]) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persist(orders: Order[]): void {
    try {
      localStorage.setItem(this.storageKeyForUser(), JSON.stringify(orders));
    } catch {
      // Storage unavailable → orders just won't survive a reload
    }
  }
}
