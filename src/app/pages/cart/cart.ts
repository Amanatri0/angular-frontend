import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { MatAnchor } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerceStore';

@Component({
  selector: 'app-cart',
  imports: [BackButton, ListCartItems, OrderSummary, MatAnchor],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export default class Cart {
  store = inject(EcommerceStore);
}
