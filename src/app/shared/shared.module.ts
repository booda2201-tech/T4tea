import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { SearchOverlayComponent } from './components/search-overlay/search-overlay.component';
import { FilterSectionComponent } from './components/filter-section/filter-section.component';
import { GsapAnimateDirective } from './directives/gsap-animate.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CartDrawerComponent,
    SearchOverlayComponent,
    FilterSectionComponent,
    GsapAnimateDirective,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    CartDrawerComponent,
    SearchOverlayComponent,
    FilterSectionComponent,
    GsapAnimateDirective,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
})
export class SharedModule {}
