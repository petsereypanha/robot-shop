import { Injectable } from '@angular/core';
import {IProduct} from "../catalog/product.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {}

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const currentCart = this.cart.getValue();
    const newCart = [...currentCart, product];
    this.cart.next(newCart);
    this.http.post('/cart', product).subscribe({
      next: () => {
        console.log('added ' + product + ' to cart!');
      },
      error: (error) => {
        if (error.status === 404) {
          console.warn('Backend endpoint not found - working offline');
        } else {
          console.warn('Backend error:', error.message);
        }
      }
    });
  }

  remove(product: IProduct) {
    const currentCart = this.cart.getValue();
    const newCart = currentCart.filter((i) => i !== product);
    this.cart.next(newCart);
    console.log('/removed ' + product.name + ' from cart!');
  }
}
