import { Component, inject } from '@angular/core';
import { ViewPannel } from '../../../directives/view-pannel';
import { EcommerceStore } from '../../../ecommerceStore';
import { ShowCartItem } from '../../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPannel, ShowCartItem],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
