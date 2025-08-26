import {Component, OnInit} from '@angular/core';
import {IProduct} from "./product.model";
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartService} from "../cart/cart.service";
import {ProductService} from "./product.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    NgForOf,
    ProductDetailsComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit{
  private products: IProduct[] = [];
  filter: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
    });
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] ?? '';
    });
  }

  get catalogProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((p: IProduct) => p.category === this.filter);
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    this.router.navigate(['/cart']);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/' + product.imageName;
  }
}
