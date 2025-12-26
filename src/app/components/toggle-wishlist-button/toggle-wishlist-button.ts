import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerceStore';
import { Products } from '../../model/productTypes';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  product = input.required<Products>();

  store = inject(EcommerceStore);

  inWishList = computed(() =>
    this.store.wishlistItems().find((p) => p.productid === this.product().productid)
  );

  toggleWishlist(product: Products) {
    if (this.inWishList()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
