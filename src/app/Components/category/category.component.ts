import { Component } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  isFavorite?: boolean; 
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories = ['Black Tea', 'Green Tea', 'Herbal Tea'];

  products: Product[] = [
    { id: 1, name: 'Moroccan Mint', price: '350 EGP', category: 'Black Tea', image: 'assets/images/mint.png', isFavorite: false },
    { id: 2, name: 'Pomegranate', price: '350 EGP', category: 'Black Tea', image: 'assets/images/pomegranate.png', isFavorite: false },
    { id: 3, name: 'Lavender Grey', price: '350 EGP', category: 'Black Tea', image: 'assets/images/lavender.png', isFavorite: true },
    { id: 4, name: 'Lemon Citrus', price: '350 EGP', category: 'Green Tea', image: 'assets/images/lemon.png', isFavorite: false },
    { id: 5, name: 'Tranquility', price: '350 EGP', category: 'Green Tea', image: 'assets/images/tranquility.png', isFavorite: false },
    { id: 6, name: 'Peachy Green', price: '350 EGP', category: 'Green Tea', image: 'assets/images/peach.png', isFavorite: false },
    { id: 7, name: 'Rosehip Peach', price: '350 EGP', category: 'Herbal Tea', image: 'assets/images/rosehip.png', isFavorite: false },
    { id: 8, name: 'Blueberry Blues', price: '350 EGP', category: 'Herbal Tea', image: 'assets/images/blueberry.png', isFavorite: false },
    { id: 9, name: 'Coconut Island', price: '350 EGP', category: 'Herbal Tea', image: 'assets/images/coconut.png', isFavorite: false },
  ];

  getProductsByCategory(cat: string) {
    return this.products.filter(p => p.category === cat);
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    console.log(`Product ${product.name} is now ${product.isFavorite ? 'in' : 'out of'} wishlist`);
  }
}
