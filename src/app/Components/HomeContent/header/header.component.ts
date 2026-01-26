import { Component} from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
trigger('contentFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),

    trigger('buttonsFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('600ms 800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

    trigger('imageFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateX(30px)' }),
        animate('1000ms 400ms ease-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' }))
      ])
    ])
  ]
})
export class HeaderComponent{




}
