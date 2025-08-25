import { Injectable } from '@angular/core';
import {IProduct} from "./catalog/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];

  constructor() { }

  add(product: IProduct) {
    this.cart.push(product);
    console.log(`Product added to cart: ${product.name}`);
  }

  // private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  //
  // constructor(private http: HttpClient) {
  //   this.http.get<IProduct[]>('/api/cart').subscribe({
  //     next: (cart) => this.cart.next(cart),
  //   });
  // }
  //
  // getCart(): Observable<IProduct[]> {
  //   return this.cart.asObservable();
  // }
  //
  // add(product: IProduct) {
  //   const newCart = [...this.cart.getValue(), product];
  //   this.cart.next(newCart);
  //   this.http.post('/api/cart', newCart).subscribe(() => {
  //     console.log('added ' + product.name + ' to cart!');
  //   });
  // }
  //
  // remove(product: IProduct) {
  //   let newCart = this.cart.getValue().filter((i) => i !== product);
  //   this.cart.next(newCart);
  //   this.http.post('/api/cart', newCart).subscribe(() => {
  //     console.log('removed ' + product.name + ' from cart!');
  //   });
  // }
}
