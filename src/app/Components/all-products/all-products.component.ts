

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // 1. استيراد الـ ActivatedRoute

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit { // 2. ضيف OnInit
  searchText: string = '';

products: any[] = [
  // --- الشاي (Teas) ---
  { id: 1, name: 'Moroccan Mint', price: '350 EGP', category: 'Black Tea', image: '../../../assets/1 (3) 6.png', isFavorite: false },
  { id: 2, name: 'Pomegranate', price: '350 EGP', category: 'Black Tea', image: '../../../assets/Black Tea.png', isFavorite: false },
  { id: 3, name: 'Lavender Grey', price: '350 EGP', category: 'Black Tea', image: '../../../assets/4 (3) 4.png', isFavorite: true },
  { id: 4, name: 'Lemon Citrus', price: '350 EGP', category: 'Green Tea', image: '../../../assets/8 (2) 2.png', isFavorite: false },
  { id: 5, name: 'Tranquility', price: '350 EGP', category: 'Green Tea', image: '../../../assets/Green Tea.png', isFavorite: false },
  { id: 6, name: 'Peachy Green', price: '350 EGP', category: 'Green Tea', image: '../../../assets/11 (2) 2.png', isFavorite: false },
  { id: 7, name: 'Rosehip Peach', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/13 (1) 2.png', isFavorite: false },
  { id: 8, name: 'Blueberry Blues', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/15 (2) 1.png', isFavorite: false },
  { id: 9, name: 'Coconut Island', price: '350 EGP', category: 'Herbal Tea', image: '../../../assets/19 (1) 1.png', isFavorite: false },

  // --- الأدوات (Teawares - Top) ---
  { id: 10, name: 'Tea Cup With Handle', price: '350 EGP', category: 'Accessories', image: '../../../assets/Mask group (4).png', isFavorite: false },
  { id: 11, name: 'Matcha Mixer & Wisker', price: '350 EGP', category: 'Accessories', image: '../../../assets/Mask group (5).png', isFavorite: false },
  { id: 12, name: 'Tea Cup', price: '350 EGP', category: 'Accessories', image: '../../../assets/Mask group (6).png', isFavorite: false },

  // --- الأدوات (Teawares - Bottom) ---
  { id: 13, name: 'Matcha Wisker', price: '350 EGP', category: 'Accessories', image: '../../../assets/matcha wisk 1.png', isFavorite: false },
  { id: 14, name: 'Tea Pot Red', price: '350 EGP', category: 'Teaware', image: '../../../assets/bot 1.png', isFavorite: false },
  { id: 15, name: 'Tea Pot Blue', price: '350 EGP', category: 'Teaware', image: '../../../assets/bot 2 1.png', isFavorite: false },
  { id: 16, name: 'Tea Pot White', price: '350 EGP', category: 'Teaware', image: '../../../assets/bot 3 1.png', isFavorite: false },
  { id: 17, name: 'Tea Cup Modern', price: '350 EGP', category: 'Accessories', image: '../../../assets/cup 3 1.png', isFavorite: false },
  { id: 18, name: 'Tea Cup Classic', price: '350 EGP', category: 'Accessories', image: '../../../assets/cup 4 1.png', isFavorite: false }
];

// مصفوفة العرض التي تتأثر بالبحث
filteredProducts = [...this.products];


constructor(private route: ActivatedRoute) {} // 3. حقن الـ ActivatedRoute

ngOnInit() {
    // 4. مراقبة الـ Query Params أول ما الصفحة تفتح أو الرابط يتغير
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchText = params['search'];
        this.onSearch(); // تنفيذ الفلترة فوراً
      } else {
        this.searchText = '';
        this.onSearch();
      }
    });
  }

onSearch() {
    const term = this.searchText.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  toggleFavorite(product: any) {
  // بنعكس الحالة
  product.isFavorite = !product.isFavorite;

  // هنا ممكن مستقبلاً تبعت للأي بي آي (API) عشان تحفظها في قاعدة البيانات
  console.log(`${product.name} favorite status: ${product.isFavorite}`);
}

}
