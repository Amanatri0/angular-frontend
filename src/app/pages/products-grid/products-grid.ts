import { Component, effect, inject, input, OnInit } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { EcommerceStore } from '../../ecommerceStore';
import { TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import Wishlist from '../wishlist/wishlist';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [ProductCard, TitleCasePipe, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid implements OnInit {
  readonly store = inject(EcommerceStore);

  category = input<string>('');

  constructor() {
    effect(() => {
      this.store.updateCategory(this.category());
    });
  }

  ngOnInit() {
    if (this.store.products().length == 0) {
      this.store.loadProducts();
      console.log(this.store.loadProducts());
    }
  }
}
