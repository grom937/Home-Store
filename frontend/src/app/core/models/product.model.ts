export interface Product {
  id?: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
  productType: string;
  categoryId: string;
}
