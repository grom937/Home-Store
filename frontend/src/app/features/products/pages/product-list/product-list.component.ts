import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Błąd pobierania produktów:', err);
        this.error = 'Nie udało się pobrać produktów z backendu.';
        this.loading = false;
      }
    });
  }
}
