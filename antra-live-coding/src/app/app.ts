import { Component, inject, OnInit, signal } from '@angular/core';
import { Product, ProductService } from './services/product';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.isLoading.set(false);
        console.log(this.products());
      },
      error: (error) => {
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.isLoading.set(false);
        console.error('Error fetching products:', error);
      }
    });
  }
}