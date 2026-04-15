import { OrderItem } from './order-item.model';

export interface Order {
  orderId: string;
  userId: string;
  userEmail: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
}
