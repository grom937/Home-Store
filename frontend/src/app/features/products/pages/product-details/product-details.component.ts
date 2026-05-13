import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, FormsModule],
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
    public authService: AuthService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.error = this.languageService.t('invalidProductId');
      this.loading = false;
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.error = this.languageService.t('productDetailsLoadError');
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    this.cartMessage = '';

    const user = this.authService.getCurrentUser();

    if (!user) {
      this.cartMessage = this.languageService.t('loginToAddCart');
      return;
    }

    if (!this.product?.id) {
      this.cartMessage = this.languageService.t('productNotFound');
      return;
    }

    const quantity = Number(this.selectedQuantity);

    if (!quantity || quantity < 1) {
      this.cartMessage = this.languageService.t('quantityMustBePositive');
      return;
    }

    this.cartService.addItem({
      userId: user.id,
      productId: this.product.id,
      quantity
    }).subscribe({
      next: () => {
        this.cartMessage = this.languageService.t('productAddedToCart');
      },
      error: (error) => {
        this.cartMessage = error.error?.message || this.languageService.t('productAddCartError');
      }
    });
  }
}
