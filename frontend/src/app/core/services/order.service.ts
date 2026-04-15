import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';
import { UpdateOrderStatusRequest } from '../models/update-order-status-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private ordersUrl = `${API_CONFIG.baseUrl}/orders`;
  private adminOrdersUrl = `${API_CONFIG.baseUrl}/admin/orders`;

  createOrder(data: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, data);
  }

  getMyOrders(userId: string): Observable<Order[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Order[]>(`${this.ordersUrl}/my`, { params });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.adminOrdersUrl);
  }

  updateStatus(orderId: string, data: UpdateOrderStatusRequest): Observable<Order> {
    return this.http.patch<Order>(`${this.adminOrdersUrl}/${orderId}/status`, data);
  }
}
