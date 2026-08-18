/** Products with no sellable price are treated as unavailable. */
export const COMING_SOON_LABEL = 'Coming Soon';

export function isComingSoon(price: number | null | undefined): boolean {
  return !(Number(price) > 0);
}

export function formatProductPrice(price: number | null | undefined): string {
  return isComingSoon(price) ? COMING_SOON_LABEL : `${Number(price)} EGP`;
}
