export interface CartItem {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartProductInput {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}
