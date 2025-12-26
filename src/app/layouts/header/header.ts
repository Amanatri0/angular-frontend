import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerceStore';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatButtonModule, MatBadge],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(EcommerceStore);
}
