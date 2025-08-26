import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {CatalogComponent} from "../catalog/catalog.component";
import {SiteHeaderComponent} from "../home/site-header/site-header.component";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,CatalogComponent,SiteHeaderComponent,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
