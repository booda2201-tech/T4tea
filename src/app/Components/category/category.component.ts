import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class CategoryComponent implements AfterViewInit, OnDestroy {
  private tl: any;
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

    this.tl = gsap.timeline();


    gsap.set(['.page-header', '.product-card'], { opacity: 0, y: 20 });

    this.tl.to('.page-header', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    .to('.product-card', {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'all'
    }, "-=0.3");
  }

  ngOnDestroy() {

    if (this.tl) this.tl.kill();
  }



}
