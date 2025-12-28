import { Component, computed, inject, input } from '@angular/core';
import { Cart } from '../../model/cart';
import { ListCartItems } from '../cart/list-cart-items/list-cart-items';
import { QuantitySelctor } from '../../components/quantity-selctor/quantity-selctor';
import { EcommerceStore } from '../../ecommerceStore';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-show-cart-item',
  imports: [QuantitySelctor, MatButtonModule, MatIcon],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<Cart>();
  store = inject(EcommerceStore);

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
