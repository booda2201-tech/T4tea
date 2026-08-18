import { Pipe, PipeTransform } from '@angular/core';
import { formatProductPrice, isComingSoon } from '../utils/coming-soon.util';

@Pipe({ name: 'isComingSoon' })
export class IsComingSoonPipe implements PipeTransform {
  transform(price: number | null | undefined): boolean {
    return isComingSoon(price);
  }
}

@Pipe({ name: 'displayPrice' })
export class DisplayPricePipe implements PipeTransform {
  transform(price: number | null | undefined): string {
    return formatProductPrice(price);
  }
}
