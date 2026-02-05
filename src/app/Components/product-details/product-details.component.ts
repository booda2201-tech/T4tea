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

  product: any = null;
  quantity: number = 1;
  activeTab: string = 'desc';
  private tl: any;

  // الداتا موحدة مع صفحة الـ Category عشان الربط يشتغل صح
  products = [
    {
      id: 1,
      name: 'Moroccan Mint',
      price: '350',
      category: 'Black Tea',
      mainImage: 'assets/1 (3) 6.png',
      gallery: ['assets/1 (3) 6.png', 'assets/Black Tea.png', 'assets/4 (3) 4.png'],
      description: 'A refreshing blend of premium black tea infused with authentic Moroccan mint leaves for a cooling, sophisticated experience.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 2,
      name: 'Pomegranate',
      price: '350',
      category: 'Black Tea',
      mainImage: 'assets/Black Tea.png',
      gallery: ['assets/Black Tea.png', 'assets/1 (3) 6.png'],
      description: 'Experience the perfect balance of bold black tea and the sweet, tangy notes of ripe pomegranate jewels.',
      brewing: { temp: '90°C', time: '4 min', dose: '1.5 tsp' }
    },
    {
      id: 3,
      name: 'Lavender Grey',
      price: '350',
      category: 'Black Tea',
      mainImage: 'assets/4 (3) 4.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    }
  ];

  ngOnInit(): void {
    // مراقبة التغير في الـ URL (عشان لو العميل داس على منتج مشابه والصفحة مفتوحة)
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const found = this.products.find(p => p.id === id);
      if (found) {
        this.product = { ...found }; // نأخذ نسخة لعدم تعديل الأصل
        this.quantity = 1; // نصفر الكمية عند تغيير المنتج
      }
    });
  }

  changeQuantity(val: number) {
    if (this.quantity + val >= 1) {
      this.quantity += val;
    }
  }

  ngAfterViewInit(): void {
    this.tl = gsap.timeline();
    // أنيميشن ناعم للعناصر
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






changeMainImage(newImg: string) {
  if (this.product.mainImage === newImg) return;

  // أنيميشن اختفاء بسيط
  gsap.to('.main-img-container img', {
    opacity: 0,
    scale: 0.9,
    duration: 0.2,
    onComplete: () => {
      this.product.mainImage = newImg; // تغيير الصورة
      // أنيميشن ظهور
      gsap.to('.main-img-container img', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    }
  });
}


}
