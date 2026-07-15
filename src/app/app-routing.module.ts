import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { TeawaresComponent } from './pages/teawares/teawares.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BestsellerPageComponent } from './pages/bestseller-page/bestseller-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: CategoryComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'teawares', component: TeawaresComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/signup', component: LoginComponent, data: { authMode: 'signup' } },
  { path: 'auth/forgot-password', component: LoginComponent, data: { authMode: 'forgot' } },
  { path: 'auth/reset-password', component: LoginComponent, data: { authMode: 'reset' } },
  { path: 'best-sellers', component: BestsellerPageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
