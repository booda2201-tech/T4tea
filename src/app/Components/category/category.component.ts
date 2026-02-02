import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

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
export class CategoryComponent implements AfterViewInit {
  categories = ['Black Tea', 'Green Tea', 'Herbal Tea'];

  products: Product[] = [
    { id: 1, name: 'Moroccan Mint', price: '350 EGP', category: 'Black Tea', image: '../../../assets/1 (3) 6.png', isFavorite: false },
    { id: 2, name: 'Pomegranate', price: '350 EGP', category: 'Black Tea', image: '../../../assets/Black Tea.png', isFavorite: false },
    { id: 3, name: 'Lavender Grey', price: '350 EGP', category: 'Black Tea', image: '../../../assets/4 (3) 4.png', isFavorite: true },
    { id: 1, name: 'Moroccan Mint', price: '350 EGP', category: 'Black Tea', image: '../../../assets/1 (3) 6.png', isFavorite: false },
    { id: 2, name: 'Pomegranate', price: '350 EGP', category: 'Black Tea', image: '../../../assets/Black Tea.png', isFavorite: false },
    { id: 3, name: 'Lavender Grey', price: '350 EGP', category: 'Black Tea', image: '../../../assets/4 (3) 4.png', isFavorite: true },
    { id: 4, name: 'Lemon Citrus', price: '350 EGP', category: 'Green Tea', image: '../../../assets/8 (2) 2.png', isFavorite: false },
    { id: 5, name: 'Tranquility', price: '350 EGP', category: 'Green Tea', image: '../../../assets/Green Tea.png', isFavorite: false },
    { id: 6, name: 'Peachy Green', price: '350 EGP', category: 'Green Tea', image: '../../../assets/11 (2) 2.png', isFavorite: false },
    { id: 4, name: 'Lemon Citrus', price: '350 EGP', category: 'Green Tea', image: '../../../assets/8 (2) 2.png', isFavorite: false },
    { id: 5, name: 'Tranquility', price: '350 EGP', category: 'Green Tea', image: '../../../assets/Green Tea.png', isFavorite: false },
    { id: 6, name: 'Peachy Green', price: '350 EGP', category: 'Green Tea', image: '../../../assets/11 (2) 2.png', isFavorite: false },
    { id: 7, name: 'Rosehip Peach', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/13 (1) 2.png', isFavorite: false },
    { id: 8, name: 'Blueberry Blues', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/15 (2) 1.png', isFavorite: false },
    { id: 9, name: 'Coconut Island', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/19 (1) 1.png', isFavorite: false },
    { id: 7, name: 'Rosehip Peach', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/13 (1) 2.png', isFavorite: false },
    { id: 8, name: 'Blueberry Blues', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/15 (2) 1.png', isFavorite: false },
    { id: 9, name: 'Coconut Island', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/19 (1) 1.png', isFavorite: false },
  ];

  getProductsByCategory(cat: string) {
    return this.products.filter(p => p.category === cat);
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    console.log(`Product ${product.name} is now ${product.isFavorite ? 'in' : 'out of'} wishlist`);
  }

  ngAfterViewInit() {

    const tl = gsap.timeline();

    tl.from('.page-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.product-card', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, "-=0.4");
  }




}
