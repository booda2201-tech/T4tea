export interface Product {
  id: string;
  title: string;
  type: string;
  price: number;
  image: string;
  /** All product images from the API (main + gallery). */
  images?: string[];
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
  /** All teaware images from the API (main + gallery). */
  images?: string[];
  description: string;
}
