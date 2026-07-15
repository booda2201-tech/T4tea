import { animate, style, transition, trigger } from '@angular/animations';

/** Vertical roll when the bound price value is recreated (e.g. *ngFor + trackBy). */
export const priceChangeAnimation = trigger('priceChange', [
  transition(':enter', [
    style({ transform: 'translateY(110%)', opacity: 0 }),
    animate(
      '420ms cubic-bezier(0.22, 1, 0.36, 1)',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ position: 'absolute', insetInline: 0, top: 0 }),
    animate(
      '420ms cubic-bezier(0.22, 1, 0.36, 1)',
      style({ transform: 'translateY(-110%)', opacity: 0 })
    ),
  ]),
]);

export function trackByPrice(_index: number, price: number): number {
  return price;
}
