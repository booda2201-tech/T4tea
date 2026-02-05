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
  // --- Black Tea ---
  {
    id: 1,
    name: 'Moroccan Mint',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/1 (3) 6.png', // لصفحة Category
    mainImage: '../../../assets/1 (3) 6.png', // لصفحة Details
    gallery: ['../../../assets/1 (3) 6.png', '../../../assets/Black Tea.png', '../../../assets/4 (3) 4.png'],
    description: 'A refreshing blend of premium black tea infused with authentic Moroccan mint leaves for a cooling, sophisticated experience.',
    brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 2,
    name: 'Pomegranate',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/Black Tea.png',
    mainImage: '../../../assets/Black Tea.png',
    gallery: ['../../../assets/Black Tea.png', '../../../assets/1 (3) 6.png'],
    description: 'Experience the perfect balance of bold black tea and the sweet, tangy notes of ripe pomegranate jewels.',
    brewing: { temp: '90°C', time: '4 min', dose: '1.5 tsp' },
    isFavorite: false
  },
  {
    id: 3,
    name: 'Lavender Grey',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/4 (3) 4.png',
    mainImage: '../../../assets/4 (3) 4.png',
    gallery: ['../../../assets/4 (3) 4.png', '../../../assets/Black Tea.png'],
    description: 'A floral twist on the classic Earl Grey, featuring fragrant lavender buds and bergamot citrus notes.',
    brewing: { temp: '95°C', time: '3-5 min', dose: '1 tsp' },
    isFavorite: true
  },
  {
    id: 4,
    name: 'Classic English',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/1 (3) 6.png',
    mainImage: '../../../assets/1 (3) 6.png',
    gallery: ['../../../assets/1 (3) 6.png'],
    description: 'The traditional morning brew, bold and full-bodied black tea.',
    brewing: { temp: '100°C', time: '5 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 5,
    name: 'Earl Grey Special',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/Black Tea.png',
    mainImage: '../../../assets/Black Tea.png',
    gallery: ['../../../assets/Black Tea.png'],
    description: 'Infused with double the bergamot for an intense citrus aroma.',
    brewing: { temp: '95°C', time: '4 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 6,
    name: 'Assam Gold',
    price: '350 EGP',
    category: 'Black Tea',
    image: '../../../assets/4 (3) 4.png',
    mainImage: '../../../assets/4 (3) 4.png',
    gallery: ['../../../assets/4 (3) 4.png'],
    description: 'Strong, malty, and brisk the perfect pick-me-up.',
    brewing: { temp: '100°C', time: '4 min', dose: '1 tsp' },
    isFavorite: false
  },

  // --- Green Tea ---
  {
    id: 7,
    name: 'Lemon Citrus',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/8 (2) 2.png',
    mainImage: '../../../assets/8 (2) 2.png',
    gallery: ['../../../assets/8 (2) 2.png', '../../../assets/Green Tea.png'],
    description: 'Bright and zesty green tea with natural lemon peel and lemongrass.',
    brewing: { temp: '80°C', time: '2-3 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 8,
    name: 'Tranquility',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/Green Tea.png',
    mainImage: '../../../assets/Green Tea.png',
    gallery: ['../../../assets/Green Tea.png', '../../../assets/8 (2) 2.png'],
    description: 'A calming blend of jasmine-infused green tea for peaceful moments.',
    brewing: { temp: '75°C', time: '2 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 9,
    name: 'Peachy Green',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/11 (2) 2.png',
    mainImage: '../../../assets/11 (2) 2.png',
    gallery: ['../../../assets/11 (2) 2.png'],
    description: 'Sweet orchard peaches blended with high-antioxidant green tea.',
    brewing: { temp: '80°C', time: '3 min', dose: '1.5 tsp' },
    isFavorite: false
  },
  {
    id: 10,
    name: 'Matcha Infusion',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/8 (2) 2.png',
    mainImage: '../../../assets/8 (2) 2.png',
    gallery: ['../../../assets/8 (2) 2.png'],
    description: 'Pure ceremonial grade matcha blended with traditional sencha leaves.',
    brewing: { temp: '70°C', time: '1 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 11,
    name: 'Zen Garden',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/Green Tea.png',
    mainImage: '../../../assets/Green Tea.png',
    gallery: ['../../../assets/Green Tea.png'],
    description: 'Green tea with hints of ginger and honey for a balanced mind.',
    brewing: { temp: '80°C', time: '2 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 12,
    name: 'Morning Dew',
    price: '350 EGP',
    category: 'Green Tea',
    image: '../../../assets/11 (2) 2.png',
    mainImage: '../../../assets/11 (2) 2.png',
    gallery: ['../../../assets/11 (2) 2.png'],
    description: 'Freshly harvested green tea with a clean, grassy finish.',
    brewing: { temp: '75°C', time: '3 min', dose: '1 tsp' },
    isFavorite: false
  },

  // --- Herbal Tea ---
  {
    id: 13,
    name: 'Rosehip Peach',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/13 (1) 2.png',
    mainImage: '../../../assets/13 (1) 2.png',
    gallery: ['../../../assets/13 (1) 2.png', '../../../assets/15 (2) 1.png'],
    description: 'Vitamin C rich rosehips blended with juicy peach slices.',
    brewing: { temp: '100°C', time: '7 min', dose: '2 tsp' },
    isFavorite: false
  },
  {
    id: 14,
    name: 'Blueberry Blues',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/15 (2) 1.png',
    mainImage: '../../../assets/15 (2) 1.png',
    gallery: ['../../../assets/15 (2) 1.png', '../../../assets/19 (1) 1.png'],
    description: 'A deep purple infusion of wild blueberries and hibiscus.',
    brewing: { temp: '100°C', time: '6 min', dose: '2 tsp' },
    isFavorite: false
  },
  {
    id: 15,
    name: 'Coconut Island',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/19 (1) 1.png',
    mainImage: '../../../assets/19 (1) 1.png',
    gallery: ['../../../assets/19 (1) 1.png'],
    description: 'Creamy coconut flakes mixed with tropical fruit botanicals.',
    brewing: { temp: '95°C', time: '5-8 min', dose: '1.5 tsp' },
    isFavorite: false
  },
  {
    id: 16,
    name: 'Chamomile Dream',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/13 (1) 2.png',
    mainImage: '../../../assets/13 (1) 2.png',
    gallery: ['../../../assets/13 (1) 2.png'],
    description: 'Pure Egyptian chamomile flowers for the ultimate night-time ritual.',
    brewing: { temp: '100°C', time: '5 min', dose: '1 tsp' },
    isFavorite: false
  },
  {
    id: 17,
    name: 'Hibiscus Punch',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/15 (2) 1.png',
    mainImage: '../../../assets/15 (2) 1.png',
    gallery: ['../../../assets/15 (2) 1.png'],
    description: 'Tart and refreshing hibiscus with notes of red berries.',
    brewing: { temp: '100°C', time: '5 min', dose: '2 tsp' },
    isFavorite: false
  },
  {
    id: 18,
    name: 'Tropical Ginger',
    price: '350 EGP',
    category: 'Herbal Tea',
    image: '../../../assets/19 (1) 1.png',
    mainImage: '../../../assets/19 (1) 1.png',
    gallery: ['../../../assets/19 (1) 1.png'],
    description: 'Spicy ginger root balanced with sweet pineapple and mango.',
    brewing: { temp: '100°C', time: '7 min', dose: '1.5 tsp' },
    isFavorite: false
  }
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
