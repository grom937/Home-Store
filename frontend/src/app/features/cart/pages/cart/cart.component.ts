import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Cart } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, CurrencyPipe, DatePipe],
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
    private authService: AuthService
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
      this.errorMessage = 'Musisz być zalogowany, aby zobaczyć koszyk.';
      return;
    }

    this.loading = true;

    this.cartService.getCart(user.id).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Nie udało się pobrać koszyka.';
        this.loading = false;
      }
    });
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return;
    }

    this.cartService.updateItem(productId, {
      userId: user.id,
      quantity: currentQuantity + 1
    }).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: () => {
        this.errorMessage = 'Nie udało się zwiększyć ilości produktu.';
      }
    });
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return;
    }

    if (currentQuantity <= 1) {
      this.removeItem(productId);
      return;
    }

    this.cartService.updateItem(productId, {
      userId: user.id,
      quantity: currentQuantity - 1
    }).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: () => {
        this.errorMessage = 'Nie udało się zmniejszyć ilości produktu.';
      }
    });
  }

  removeItem(productId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return;
    }

    this.cartService.removeItem(user.id, productId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.successMessage = 'Produkt został usunięty z koszyka.';
      },
      error: () => {
        this.errorMessage = 'Nie udało się usunąć produktu z koszyka.';
      }
    });
  }

  clearCart(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return;
    }

    this.cartService.clearCart(user.id).subscribe({
      next: () => {
        this.loadCart();
        this.successMessage = 'Koszyk został wyczyszczony.';
      },
      error: () => {
        this.errorMessage = 'Nie udało się wyczyścić koszyka.';
      }
    });
  }

  createOrder(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
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
        this.successMessage = 'Zamówienie zostało złożone.';
        this.loadCart();
      },
      error: (error) => {
        this.orderLoading = false;
        this.errorMessage = error.error?.message || 'Nie udało się złożyć zamówienia.';
      }
    });
  }
}
