import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  wishlistItems = [
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
    {
      id: 1,
      name: 'Pomegranate',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Black Tea.png'
    },
    {
      id: 2,
      name: 'Moroccan Mint',
      description: 'A refined blend of tangy black tea layered with ripe pomegranate, delicate raspberry, and soft floral hibiscus...',
      price: 350,
      image: '../../../assets/Green Tea.png'
    },
  ];

onDelete(id: number) {
  gsap.to(`#item-${id}`, {
    opacity: 0,
    x: -50,
    duration: 0.4,
    onComplete: () => {
      // هنا تمسح العنصر من الـ Array الفعلية
      this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    }
  });
}

  onAddToCart(item: any) {
    console.log('Adding to cart:', item.name);

  }
}
