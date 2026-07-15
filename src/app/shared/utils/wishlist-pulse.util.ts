export function pulseWishlistButton(event: Event): void {
  const target = event.currentTarget;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  target.classList.remove('is-pulsing');
  void target.offsetWidth;
  target.classList.add('is-pulsing');

  window.setTimeout(() => {
    target.classList.remove('is-pulsing');
  }, 550);
}
