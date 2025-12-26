import { Component, inject } from '@angular/core';
import { ViewPannel } from '../../../directives/view-pannel';
import { EcommerceStore } from '../../../ecommerceStore';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPannel],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
