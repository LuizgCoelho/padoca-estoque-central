
import { Product, ProductCategory } from "../types/product";

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Pão Francês",
    price: 0.50,
    quantity: 100,
    category: "pães",
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Pão de Queijo",
    price: 2.50,
    quantity: 50,
    category: "pães",
    createdAt: new Date()
  },
  {
    id: "3",
    name: "Bolo de Chocolate",
    price: 25.00,
    quantity: 10,
    category: "bolos",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdAt: new Date()
  },
  {
    id: "4",
    name: "Croissant",
    price: 4.50,
    quantity: 30,
    category: "pães",
    createdAt: new Date()
  },
  {
    id: "5",
    name: "Café Expresso",
    price: 3.00,
    quantity: 200,
    category: "bebidas",
    createdAt: new Date()
  },
  {
    id: "6",
    name: "Coxinha de Frango",
    price: 4.50,
    quantity: 40,
    category: "salgados",
    createdAt: new Date()
  }
];
