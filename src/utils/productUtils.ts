
import { Product, ProductFormData } from "../types/product";

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create a new product
export const createProduct = (productData: ProductFormData): Product => {
  return {
    ...productData,
    id: generateId(),
    createdAt: new Date()
  };
};

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Get low stock products (less than 10 items)
export const getLowStockProducts = (products: Product[]): Product[] => {
  return products.filter(product => product.quantity < 10);
};

// Calculate total inventory value
export const calculateInventoryValue = (products: Product[]): number => {
  return products.reduce((total, product) => 
    total + (product.price * product.quantity), 0);
};

// Group products by category
export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
  return products.reduce((grouped, product) => {
    const category = product.category;
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(product);
    return grouped;
  }, {} as Record<string, Product[]>);
};

// Sort products by various criteria
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'quantity-asc':
      return sortedProducts.sort((a, b) => a.quantity - b.quantity);
    case 'quantity-desc':
      return sortedProducts.sort((a, b) => b.quantity - a.quantity);
    default:
      return sortedProducts;
  }
};
