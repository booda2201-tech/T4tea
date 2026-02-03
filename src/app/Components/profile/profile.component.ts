import { Component, HostListener } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

isSearchOpen = false;
  isAccountMenuOpen = false;
  isMobileMenuOpen = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.isAccountMenuOpen = false;
      this.isMobileMenuOpen = false;
    }
  }

  toggleAccountMenu(event: Event) {
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
    if (this.isAccountMenuOpen) this.isSearchOpen = false;
  }

  @HostListener('document:click')
  closeMenus() {
    this.isAccountMenuOpen = false;
  }

}
