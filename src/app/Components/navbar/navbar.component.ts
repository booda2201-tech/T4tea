import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // 1. استيراد الراوتر

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
isSearchOpen = false;
  isAccountMenuOpen = false;
  isMobileMenuOpen = false;


constructor(private router: Router) {} // 2. حقن الراوتر في الـ Constructor


onSearchTyping(event: any) {
    const term = event.target.value;


    this.router.navigate(['/all-products'], {
      queryParams: { search: term },
      queryParamsHandling: 'merge'
    });
  }


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
