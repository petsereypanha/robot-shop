import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl= environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getProducts() {
    return this.http.get(`${this.baseUrl}/api/products`);
  }
}
