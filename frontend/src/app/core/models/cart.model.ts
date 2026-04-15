import { CartItem } from './cart-item.model';

export interface Cart {
  cartId: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}
