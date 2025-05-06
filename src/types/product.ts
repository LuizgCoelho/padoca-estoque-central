
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  expiryDate?: Date;
  createdAt: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;

export type ProductCategory = 'pães' | 'bolos' | 'doces' | 'salgados' | 'bebidas' | 'outros';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'pães',
  'bolos',
  'doces',
  'salgados',
  'bebidas',
  'outros'
];
