import { Component, computed, inject, input, output } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Products } from '../../model/productTypes';
import { EcommerceStore } from '../../ecommerceStore';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon, MatButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Products>();

  store = inject(EcommerceStore);
}
