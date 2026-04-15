import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Cart } from '../models/cart.model';
import { AddToCartRequest } from '../models/add-to-cart-request.model';
import { UpdateCartItemRequest } from '../models/update-cart-item-request.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private cartUrl = `${API_CONFIG.baseUrl}/cart`;

  getCart(userId: string): Observable<Cart> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Cart>(this.cartUrl, { params });
  }

  addItem(data: AddToCartRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartUrl}/items`, data);
  }

  updateItem(productId: string, data: UpdateCartItemRequest): Observable<Cart> {
    return this.http.patch<Cart>(`${this.cartUrl}/items/${productId}`, data);
  }

  removeItem(userId: string, productId: string): Observable<Cart> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<Cart>(`${this.cartUrl}/items/${productId}`, { params });
  }

  clearCart(userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<void>(this.cartUrl, { params });
  }
}
