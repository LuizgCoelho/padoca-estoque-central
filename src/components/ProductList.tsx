
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ProductCard from './ProductCard';
import { Product, PRODUCT_CATEGORIES } from '../types/product';
import { sortProducts } from '../utils/productUtils';

interface ProductListProps {
  products: Product[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('name');

  // Filter products based on search input and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered products
  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortOption);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2">
          <Label htmlFor="search" className="mb-2 block">Buscar produto</Label>
          <Input
            id="search"
            placeholder="Digite o nome do produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <Label htmlFor="category" className="mb-2 block">Categoria</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Todas categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <Label htmlFor="sort" className="mb-2 block">Ordenar por</Label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome (A-Z)</SelectItem>
              <SelectItem value="price-asc">Preço (menor-maior)</SelectItem>
              <SelectItem value="price-desc">Preço (maior-menor)</SelectItem>
              <SelectItem value="quantity-asc">Quantidade (menor-maior)</SelectItem>
              <SelectItem value="quantity-desc">Quantidade (maior-menor)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedAndFilteredProducts.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAndFilteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
