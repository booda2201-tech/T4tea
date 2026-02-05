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
    },
        {
      id: 4,
      name: 'Moroccan Mint',
      price: '350 EGP',
      category: 'Black Tea',
      mainImage: 'assets/1 (3) 6.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 5,
      name: 'Pomegranate',
      price: '350 EGP',
      category: 'Black Tea',
      mainImage: 'assets/Black Tea.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 6,
      name: 'Lavender Grey',
      price: '350 EGP',
      category: 'Black Tea',
      mainImage: 'assets/4 (3) 4.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 7,
      name: 'Lemon Citrus',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/8 (2) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 8,
      name: 'Tranquility',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/Green Tea.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 9,
      name: 'Peachy Green',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/11 (2) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 10,
      name: 'Lemon Citrus',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/8 (2) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 11,
      name: 'Tranquility',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/Green Tea.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 12,
      name: 'Peachy Green',
      price: '350 EGP',
      category: 'Green Tea',
      mainImage: 'assets/11 (2) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 13,
      name: 'Rosehip Peach',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/13 (1) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 14,
      name: 'Blueberry Blues',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/15 (2) 1.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 15,
      name: 'Coconut Island',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/19 (1) 1.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 16,
      name: 'Rosehip Peach',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/13 (1) 2.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 17,
      name: 'Blueberry Blues',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/15 (2) 1.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
    {
      id: 18,
      name: 'Coconut Island',
      price: '350 EGP',
      category: 'Herbal Tea',
      mainImage: 'assets/19 (1) 1.png',
      gallery: ['assets/4 (3) 4.png', 'assets/Black Tea.png'],
      description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
      brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' }
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const found = this.products.find(p => p.id === id);
      if (found) {
        this.product = { ...found };
        this.quantity = 1;
      }
    });
  }

  changeQuantity(val: number) {
    if (this.quantity + val >= 1) {
      this.quantity += val;
    }
  }

  changeMainImage(newImg: string) {
    if (this.product.mainImage === newImg) return;


    gsap.to('.main-img-container img', {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: () => {
        this.product.mainImage = newImg;
        gsap.to('.main-img-container img', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
      }
    });
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
