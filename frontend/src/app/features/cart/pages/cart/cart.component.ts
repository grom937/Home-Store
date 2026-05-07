import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';
import { Cart } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  errorMessage = '';
  successMessage = '';
  orderLoading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const user = this.authService.getCurrentUser();

    if (!user) {
      this.loading = false;
      this.errorMessage = this.languageService.t('loginRequired');
      return;
    }

    this.loading = true;

    this.cartService.getCart(user.id).subscribe({
      next: (cart: Cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = this.languageService.t('cartLoadError');
        this.loading = false;
      }
    });
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.cartService.updateItem(productId, {
      userId: user.id,
      quantity: currentQuantity + 1
    }).subscribe({
      next: (cart: Cart) => {
        this.cart = cart;
      },
      error: () => {
        this.errorMessage = this.languageService.t('cartIncreaseError');
      }
    });
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (currentQuantity <= 1) {
      this.removeItem(productId);
      return;
    }

    this.cartService.updateItem(productId, {
      userId: user.id,
      quantity: currentQuantity - 1
    }).subscribe({
      next: (cart: Cart) => {
        this.cart = cart;
      },
      error: () => {
        this.errorMessage = this.languageService.t('cartDecreaseError');
      }
    });
  }

  removeItem(productId: string): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.cartService.removeItem(user.id, productId).subscribe({
      next: (cart: Cart) => {
        this.cart = cart;
        this.successMessage = this.languageService.t('cartItemRemoved');
      },
      error: () => {
        this.errorMessage = this.languageService.t('cartRemoveError');
      }
    });
  }

  clearCart(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.cartService.clearCart(user.id).subscribe({
      next: () => {
        this.loadCart();
        this.successMessage = this.languageService.t('cartCleared');
      },
      error: () => {
        this.errorMessage = this.languageService.t('cartClearError');
      }
    });
  }

  createOrder(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.errorMessage = this.languageService.t('loginRequired');
      return;
    }

    this.orderLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.orderService.createOrder({
      userId: user.id
    }).subscribe({
      next: () => {
        this.orderLoading = false;
        this.successMessage = this.languageService.t('orderCreated');
        this.loadCart();
      },
      error: (error) => {
        this.orderLoading = false;
        this.errorMessage = error.error?.message || this.languageService.t('orderCreateError');
      }
    });
  }
}
