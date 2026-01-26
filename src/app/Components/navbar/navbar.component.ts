import { Component, HostListener } from '@angular/core'; // ضروري جداً

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
