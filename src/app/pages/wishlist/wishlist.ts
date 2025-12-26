import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerceStore';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, MatAnchor],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export default class Wishlist {
  store = inject(EcommerceStore);
}
