import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error = '';
  cartMessage = '';
  selectedQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.error = 'Nieprawidłowy identyfikator produktu.';
      this.loading = false;
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać szczegółów produktu.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    this.cartMessage = '';

    const user = this.authService.getCurrentUser();

    if (!user) {
      this.cartMessage = 'Musisz się zalogować, aby dodać produkt do koszyka.';
      return;
    }

    if (!this.product?.id) {
      this.cartMessage = 'Nie znaleziono produktu.';
      return;
    }

    const quantity = Number(this.selectedQuantity);

    if (!quantity || quantity < 1) {
      this.cartMessage = 'Ilość musi być większa od 0.';
      return;
    }

    this.cartService.addItem({
      userId: user.id,
      productId: this.product.id,
      quantity
    }).subscribe({
      next: () => {
        this.cartMessage = 'Produkt został dodany do koszyka.';
      },
      error: (error) => {
        this.cartMessage = error.error?.message || 'Nie udało się dodać produktu do koszyka.';
      }
    });
  }
}
