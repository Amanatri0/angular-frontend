import { Component } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';

@Component({
  selector: 'app-cart',
  imports: [BackButton, ListCartItems],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export default class Cart {}
