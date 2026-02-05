import { Component, OnInit, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);

  // المتغيرات المطلوبة في الـ HTML
  product: any;
  quantity: number = 1;
  activeTab: string = 'desc';
  private tl: any;

  // داتا المنتجات بنفس هيكل الـ HTML بتاعك
  products = [
    {
      id: 1,
      name: 'Moroccan Mint',
      price: '350',
      category: 'Black Tea',
      mainImage: 'assets/1 (3) 6.png', // مطابقة لـ [src]="product.mainImage"
      gallery: ['assets/1 (3) 6.png', 'assets/Black Tea.png', 'assets/4 (3) 4.png'], // مطابقة لـ product.gallery
      description: 'A refined blend of tangy black tea with ripe pomegranate, delicate raspberry, and soft floral hibiscus.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 2,
      name: 'Pomegranate',
      price: '350',
      category: 'Black Tea',
      mainImage: 'assets/Black Tea.png',
      gallery: ['assets/Black Tea.png', 'assets/1 (3) 6.png'],
      description: 'Crafted from select leaves, it transforms tea into a refined daily ritual.',
      brewing: { temp: '90°C', time: '4 min', dose: '1.5 tsp' }
    }
    // ضيف باقي المنتجات هنا..
  ];

  ngOnInit(): void {
    const idFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    const foundProduct = this.products.find(p => p.id === idFromRoute);

    if (foundProduct) {
      // بنعمل Shallow Copy عشان لما نغير الـ mainImage في الجاليري ما نضربش الداتا الأصلية
      this.product = { ...foundProduct };
    }
  }

  // الدوال المطلوبة في الـ HTML
  changeQuantity(val: number) {
    if (this.quantity + val >= 1) {
      this.quantity += val;
    }
  }

  ngAfterViewInit(): void {
    this.tl = gsap.timeline();
    gsap.set(['.image-section', '.info-section'], { opacity: 0, y: 30 });
    this.tl.to(['.image-section', '.info-section'], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  ngOnDestroy(): void {
    if (this.tl) this.tl.kill();
  }
}
