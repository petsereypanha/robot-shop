import {Component, inject, OnInit} from '@angular/core';
import {IProduct} from "./product.model";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartService} from "../cart/cart.service";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    NgForOf,

    ProductDetailsComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit{
  products: any;
  filter: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getFilteredProducts(){
    return this.filter === ''
        ? this.products
        : this.products.filter((p: any) => p.category === this.filter);
  }
  addToCart(product: IProduct) {
    this.cartService.add(product);
  }
}
