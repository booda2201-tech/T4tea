import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  cartItems = [
    { name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/Black Tea.png' },
    { name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/Green Tea.png' },
    { name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/Herbal Tea.png' },
    { name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/15 (2) 1.png' },
    { name: 'Pomegranate', type: 'Black Tea', price: 350, quantity: 2, image: '../../../assets/11.png' },
    { name: 'Moroccan Mint', type: 'Black Tea', price: 350, quantity: 1, image: '../../../assets/22 (1) 2.png' },
  ];

  increase(item: any) { item.quantity++; }
  decrease(item: any) { if(item.quantity > 1) item.quantity--; }


  calculateTotal() {
  return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}





}



