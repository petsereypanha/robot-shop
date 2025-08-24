import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {IProduct} from "../catalog/product.model";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();
  cart: IProduct[] = [];

  getImageUrl(product: IProduct): string {
    return product.imageName;
  }

  buyButtonClick(product: IProduct) {
    this.buy.emit(product);
  }

  getDiscountedClass(product: IProduct) {
    if (product.discount > 0)
      return 'strikethrough';
    else
      return [];
  }
}
