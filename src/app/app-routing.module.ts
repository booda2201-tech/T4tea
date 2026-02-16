import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthenticationComponent } from './Components/layout/authentication/authentication.component';
import { MainComponent } from './Components/layout/main/main.component';
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
import { LogoutComponent } from './Components/logout/logout.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'bestseller-page', component: BestsellerPageComponent },
      { path: 'explore-page', component: ExplorePageComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'teawares', component: TeawaresComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'all-products', component: AllProductsComponent },
    ]
  },


  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
