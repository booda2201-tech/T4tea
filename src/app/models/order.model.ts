import { CartItem } from './cart-item.model';

export interface OrderAddress {
  street: string;
  city: string;
  governorate: string;
  label?: string;
  postalCode?: string;
  notes?: string;
}

export type OrderStatus =
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  /** Human-readable reference such as T4-2025-02831 */
  orderNumber?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'card' | 'cod';
  address: OrderAddress;
  /** Backend address id — used to hydrate address when API omits nested fields. */
  addressId?: string | number | null;
  fullName: string;
  phone: string;
  status: OrderStatus;
  createdAt: string;
}

export interface CheckoutPayload {
  fullName: string;
  phone: string;
  address: OrderAddress;
  paymentMethod: 'card' | 'cod';
  subtotal: number;
  shipping: number;
  total: number;
  items: CartItem[];
  addressId?: string | number | null;
  notes?: string;
}
