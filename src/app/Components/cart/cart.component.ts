import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  isSummaryOpen: boolean = false;
  cartItems = [
    { id: 1, name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/Black Tea.png' },
    { id: 2, name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/Green Tea.png' },
    { id: 3, name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/Herbal Tea.png' },
    { id: 4, name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/15 (2) 1.png' },
    { id: 5, name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/11.png' },
    { id: 6, name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/22 (1) 2.png' },
  ];

  increase(item: any) { item.quantity++; }
  decrease(item: any) { if(item.quantity > 1) item.quantity--; }

  calculateTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  onDelete(id: number) {
    gsap.to(`#item-${id}`, {
      opacity: 0,
      x: -4250,
      scale: 0.2,
      duration: 0.4,
      onComplete: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      }

    });
  }





  toggleSummary() {
    this.isSummaryOpen = !this.isSummaryOpen;
  }
}


