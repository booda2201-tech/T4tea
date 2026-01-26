import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/HomeContent/header/header.component';
import { CollectionsComponent } from './Components/HomeContent/collections/collections.component';
import { FeatureComponent } from './Components/HomeContent/feature/feature.component';
import { BestSellerComponent } from './Components/HomeContent/best-seller/best-seller.component';
import { GettyImagesComponent } from './Components/HomeContent/getty-images/getty-images.component';
import { BestsellerPageComponent } from './Components/bestseller-page/bestseller-page.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'feature', component: FeatureComponent },
    { path: 'best-seller', component: BestSellerComponent },
    { path: 'getty-images', component: GettyImagesComponent },
    { path: 'bestseller-page', component: BestsellerPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
