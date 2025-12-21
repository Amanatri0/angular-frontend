import { Component, input } from '@angular/core';
import ProductsGrid, { Products } from '../../pages/products-grid/products-grid';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon, MatButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Products>();
}
