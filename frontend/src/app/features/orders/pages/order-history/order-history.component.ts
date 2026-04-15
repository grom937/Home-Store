import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgIf } from '@angular/common';

import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, NgIf, CurrencyPipe, DatePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.loading = false;
      this.errorMessage = 'Musisz być zalogowany, aby zobaczyć swoje zamówienia.';
      return;
    }

    this.orderService.getMyOrders(user.id).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Nie udało się pobrać zamówień.';
        this.loading = false;
      }
    });
  }
}
