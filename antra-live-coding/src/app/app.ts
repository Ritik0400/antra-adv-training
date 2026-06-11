import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private productService = inject(ProductService);

  products = signal<any[]>([]);

  ngOnInit(): void{

    this.productService.getProducts().subscribe((response: any) => {
      this.products.set(response.products);
      console.log(this.products());
    });
  }



  
}
