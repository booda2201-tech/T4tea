import { CartItem } from './cart-item.model';

export interface OrderAddress {
  street: string;
  city: string;
  governorate: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'card' | 'cod';
  address: OrderAddress;
  fullName: string;
  phone: string;
  status: 'processing' | 'delivered' | 'cancelled';
  createdAt: string;
}
