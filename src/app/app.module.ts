import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    CollectionsComponent,
    FeatureComponent,
    BestSellerComponent,
    // BestsellerPageComponent,
    InfiniteSliderComponent,
    ExplorePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
