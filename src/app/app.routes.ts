import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {CartComponent} from "./cart/cart.component";
import {SignInComponent} from "./user/sign-in/sign-in.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  { path: '**', redirectTo: '' }
];
