import {Component, OnInit} from '@angular/core';
import {IProduct} from "../catalog/product.model";
import {CartService} from "./cart.service";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private cart: IProduct[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }
  get cartItems() {
    return this.cart;
  }

  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct) {
    this.cartService.remove(product);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/' + product.imageName;
  }
}
