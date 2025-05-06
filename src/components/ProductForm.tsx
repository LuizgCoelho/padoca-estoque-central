
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFormData, PRODUCT_CATEGORIES } from '../types/product';
import { toast } from '@/hooks/use-toast';

interface ProductFormProps {
  onAddProduct: (product: ProductFormData) => void;
}

const initialProductState: ProductFormData = {
  name: '',
  price: 0,
  quantity: 0,
  category: 'outros',
};

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState<ProductFormData>(initialProductState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setProduct({
      ...product,
      [name]: name === 'price' || name === 'quantity' 
        ? parseFloat(value) || 0
        : value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setProduct({
      ...product,
      category: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.name) {
      toast({
        title: "Erro",
        description: "O nome do produto é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (product.price <= 0) {
      toast({
        title: "Erro",
        description: "O preço deve ser maior que zero",
        variant: "destructive",
      });
      return;
    }

    if (product.quantity <= 0) {
      toast({
        title: "Erro",
        description: "A quantidade deve ser maior que zero",
        variant: "destructive",
      });
      return;
    }

    onAddProduct(product);
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao estoque`,
    });
    
    // Reset form
    setProduct(initialProductState);
  };

  return (
    <Card className="bg-white border-bakery-wheat">
      <CardHeader className="bg-bakery-wheat bg-opacity-40">
        <CardTitle className="text-bakery-chocolate">Adicionar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Pão Francês"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={product.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={product.price || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                placeholder="0"
                value={product.quantity || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-bakery-bread hover:bg-bakery-crust"
          >
            Adicionar ao Estoque
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
