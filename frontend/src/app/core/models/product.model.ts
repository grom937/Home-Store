export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
  productType: string;
  categoryId: number;
}
