import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
isSummaryOpen: boolean = false;
  // بيانات المستخدم
  userData = {
    name: 'abdo',
    email: 'booda2201@gmail.com'
  };

  // المتغيرات اللي كانت مسببة Error في الصورة
  discountCode: string = '';
  isOrderProcessing: boolean = false;

  // العناوين (نفس اللي في صور السايت بتاعك)
  addresses = [
    { id: 1, label: 'El Tahrir St - Hadayek Al-Ahram - Giza', isDefault: true },
    { id: 2, label: '1111 - Hadayek Al-Ahram - Giza', isDefault: false },
    { id: 3, label: 'El Tharwa El Madaneia - Hadayek Al-Ahram - Giza', isDefault: false }
  ];

  selectedAddressId: number = 1;
  paymentMethod: string = 'cod';

  // المنتجات الحقيقية من الـ Cart بتاعتك
  orderSummary = {
    items: [
      { name: 'Pomegranate Black Tea', category: 'Black Tea', quantity: 2, price: 350, image: 'assets/images/tea-pomegranate.png' },
      { name: 'Moroccan Mint Green Tea', category: 'Green Tea', quantity: 1, price: 350, image: 'assets/images/tea-mint.png' }
    ],
    deliveryFee: 50,
    total: 1100
  };

  constructor() { }

  ngOnInit(): void { }

  // Getter لحساب المجموع الفرعي تلقائياً
  get subtotal() {
    return this.orderSummary.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // الدالة اللي كانت ناقصة ومسببة Error
  openNewAddressModal() {
    console.log('Opening Add Address Modal...');
    // هنا ممكن تربطها بالـ Service اللي بتفتح المودال بتاعك
  }

  applyDiscount() {
    console.log('Applying code:', this.discountCode);
    if(this.discountCode) {
      alert('Discount code applied!');
    }
  }

  confirmOrder() {
    this.isOrderProcessing = true;
    setTimeout(() => {
      this.isOrderProcessing = false;
      alert('Order placed successfully!');
    }, 2000);
  }


toggleSummary() {
  this.isSummaryOpen = !this.isSummaryOpen;
}







}
