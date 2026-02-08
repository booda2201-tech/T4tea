import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/HomeContent/header/header.component';
import { CollectionsComponent } from './Components/HomeContent/collections/collections.component';
import { FeatureComponent } from './Components/HomeContent/feature/feature.component';
import { BestSellerComponent } from './Components/HomeContent/best-seller/best-seller.component';
import { BestsellerPageComponent } from './Components/bestseller-page/bestseller-page.component';
import { InfiniteSliderComponent } from './Components/HomeContent/infinite-slider/infinite-slider.component';
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
import { AuthenticationComponent } from './Components/layout/authentication/authentication.component';
import { MainComponent } from './Components/layout/main/main.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    CollectionsComponent,
    FeatureComponent,
    // BestSellerComponent,
    // BestsellerPageComponent,
    InfiniteSliderComponent,
    ExplorePageComponent,
    CategoryComponent,
    // TeawaresComponent,
    AboutUsComponent,
    CartComponent,
    LoginComponent,
    ProfileComponent,
    WishlistComponent,
    ProductDetailsComponent,
    LogoutComponent,
    AuthenticationComponent,
    MainComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BestSellerComponent,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
