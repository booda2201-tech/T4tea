export interface CartItem {
  id: string;
  kind: 'product' | 'teaware';
  name: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartProductInput {
  id: string;
  kind: 'product' | 'teaware';
  name: string;
  type: string;
  price: number;
  image: string;
}
