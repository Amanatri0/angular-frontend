import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Products } from '../../model/productTypes';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5198/api/product/all';

  category = input<string>('');

  products = signal<Products[]>([]);

  isLoading = signal<boolean>(true);

  filteredProducts = computed(() => {
    const currentCategory = this.category();
    const allProdcuts = this.products();

    if (currentCategory === 'all') {
      return allProdcuts;
    }

    return allProdcuts.filter((p) => p.category === currentCategory);
  });

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading.set(true);

    this.http.get<{ message: string; data: Products[] }>(this.apiUrl).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.products.set(response.data);
        } else {
          console.warn('Response received but data array is missing:', response);
          this.products.set([]);
        }

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading.set(false);
      },
    });
  }
}
