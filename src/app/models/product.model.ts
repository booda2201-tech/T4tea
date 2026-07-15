export interface Product {
  id: string;
  title: string;
  type: string;
  price: number;
  image: string;
  flavorProfile?: string;
  mood?: string;
  caffeine?: string;
  description: string;
  aroma?: string;
  tasteNotes?: string;
  brewingGuide?: string;
}

export interface Teaware {
  id: string;
  title: string;
  type: string;
  price: number;
  image: string;
  description: string;
}
