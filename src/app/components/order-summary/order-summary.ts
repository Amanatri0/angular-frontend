import { Component, computed, inject } from '@angular/core';
import { ViewPannel } from '../../directives/view-pannel';
import { EcommerceStore } from '../../ecommerceStore';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [ViewPannel],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {
  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    )
  );

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => this.subtotal() + this.tax());
}
