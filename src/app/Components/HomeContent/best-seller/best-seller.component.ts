import { Component } from '@angular/core';


interface Product {
  name: string;
  image: string;
  altText: string;
}

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent {


  bestSellers: Product[] = [
    {
      name: 'Herbal Tea',
      image: '../../../../assets/Herbal Tea.png',
      altText: 'Herbal Tea'
    },
    {
      name: 'Black Tea',
      image: '../../../../assets/Black Tea.png',
      altText: 'Black Tea'
    },
    {
      name: 'Green Tea',
      image: '../../../../assets/Green Tea.png',
      altText: 'Green Tea'
    }
  ];

}
