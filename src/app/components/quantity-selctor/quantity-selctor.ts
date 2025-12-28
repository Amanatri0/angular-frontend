import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-selctor',
  imports: [MatButtonModule, MatIcon, MatIconModule],
  templateUrl: './quantity-selctor.html',
  styleUrl: './quantity-selctor.scss',
})
export class QuantitySelctor {
  quantity = input(0);
  quantityUpdated = output<number>();
}
