import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/HomeContent/header/header.component';
import { CollectionsComponent } from './Components/HomeContent/collections/collections.component';
import { FeatureComponent } from './Components/HomeContent/feature/feature.component';
import { BestSellerComponent } from './Components/HomeContent/best-seller/best-seller.component';
import { BestsellerPageComponent } from './Components/bestseller-page/bestseller-page.component';
import { ExplorePageComponent } from './Components/explore-page/explore-page.component';
import { CategoryComponent } from './Components/category/category.component';
import { TeawaresComponent } from './Components/teawares/teawares.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'feature', component: FeatureComponent },
    { path: 'best-seller', component: BestSellerComponent },
    { path: 'bestseller-page', component: BestsellerPageComponent },
    { path: 'explore-page', component: ExplorePageComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent }, 
    { path: '', redirectTo: '/category', pathMatch: 'full' },
    { path: 'teawares', component: TeawaresComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'wishlist', component: WishlistComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
