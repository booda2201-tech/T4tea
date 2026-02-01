import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teawares',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teawares.component.html',
  styleUrls: ['./teawares.component.scss']
})
export class TeawaresComponent {

  topProducts = [
    { name: 'Tea Cup With Handle', price: 350, img: '../../../assets/Mask group (4).png' },
    { name: 'Matcha Mixer & Wisker', price: 350, img: '../../../assets/Mask group (5).png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/Mask group (6).png' }
  ];

  bottomProducts = [
    { name: 'Matcha Wisker', price: 350, img: '../../../assets/matcha wisk 1.png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/cup 3 1.png' },
    { name: 'Tea Cup', price: 350, img: '../../../assets/cup 4 1.png' },
    { name: 'Tea Pot Red', price: 350, img: '../../../assets/bot 1.png' },
    { name: 'Tea Pot Blue', price: 350, img: '../../../assets/bot 2 1.png' },
    { name: 'Tea Pot White', price: 350, img: '../../../assets/bot 3 1.png' }
  ];

}
