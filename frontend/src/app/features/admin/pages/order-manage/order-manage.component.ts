import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-manage',
  standalone: true,
  imports: [CommonModule, NgIf, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './order-manage.component.html',
  styleUrl: './order-manage.component.css'
})
export class OrderManageComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  statuses = ['NEW', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(false);
  }

  loadOrders(clearMessages: boolean = true): void {
    this.loading = true;

    if (clearMessages) {
      this.errorMessage = '';
      this.successMessage = '';
    }

    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Nie udało się pobrać zamówień.';
        this.loading = false;
      }
    });
  }

  updateStatus(orderId: string, status: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.orderService.updateStatus(orderId, { status }).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex(order => order.orderId === orderId);

        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }

        this.successMessage = `Status zamówienia został zmieniony na ${updatedOrder.status}.`;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Nie udało się zaktualizować statusu.';
      }
    });
  }
}
