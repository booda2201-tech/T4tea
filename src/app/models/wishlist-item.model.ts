export interface WishlistItem {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}

export type WishlistProductInput = Omit<WishlistItem, never>;
