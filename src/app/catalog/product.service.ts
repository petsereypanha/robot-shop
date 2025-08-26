import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environments';
import {BehaviorSubject, Observable} from "rxjs";
import {IProduct} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.loadProducts();
  }

  getProducts(): Observable<IProduct[]>  {
    return this.product.asObservable();
  }

  private loadProducts(): void {
    this.http.get<IProduct[]>(`${environment.apiUrl}/products`).subscribe({
      next: (products) => {
        this.product.next(products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
}
