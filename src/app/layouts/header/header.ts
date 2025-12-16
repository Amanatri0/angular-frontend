import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
