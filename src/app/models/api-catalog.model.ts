export interface ApiCategory {
  id?: string | number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface ApiProduct {
  id?: number | string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  brewingGuide?: string;
  categoryId?: number;
  categoryName?: string;
  imageUrls?: string[];
  imageUrl?: string;
}

export interface ApiTeaware {
  id?: number | string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  categoryId?: number;
  categoryName?: string;
  teawareCategoryId?: number;
  teawareCategoryName?: string;
  imageUrl?: string;
  imageUrls?: string[];
}
