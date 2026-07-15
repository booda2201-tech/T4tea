import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './home/best-seller/best-seller.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TeawaresComponent } from './teawares/teawares.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BestsellerPageComponent } from './bestseller-page/bestseller-page.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SplashComponent,
    HomeComponent,
    AboutComponent,
    CategoryComponent,
    ProductDetailComponent,
    TeawaresComponent,
    CheckoutComponent,
    LoginComponent,
    ProfileComponent,
    WishlistComponent,
    BestsellerPageComponent,
    ExplorePageComponent,
  ],
  imports: [SharedModule, BestSellerComponent, FormsModule, ReactiveFormsModule],
  exports: [
    SplashComponent,
    HomeComponent,
    AboutComponent,
    CategoryComponent,
    ProductDetailComponent,
    TeawaresComponent,
    CheckoutComponent,
    LoginComponent,
    ProfileComponent,
    WishlistComponent,
    BestsellerPageComponent,
    ExplorePageComponent,
  ],
})
export class PagesModule {}
