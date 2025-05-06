
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '../types/product';
import { formatCurrency } from '../utils/productUtils';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onIncrement, 
  onDecrement, 
  onDelete 
}) => {
  const isLowStock = product.quantity < 10;

  return (
    <Card className="h-full flex flex-col border-2 hover:shadow-md transition-all">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span 
            className={`px-2 py-1 rounded text-xs font-medium ${
              isLowStock 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}
          >
            {isLowStock ? 'Estoque baixo' : 'Em estoque'}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-2 capitalize">
          Categoria: {product.category}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-xl font-bold text-bakery-bread">
            {formatCurrency(product.price)}
          </div>
          <div className="bg-bakery-wheat bg-opacity-50 px-3 py-1 rounded-full">
            {product.quantity} unid.
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onDecrement(product.id)}
            disabled={product.quantity <= 0}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="font-medium mx-2">
            {product.quantity}
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onIncrement(product.id)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onDelete(product.id)}
          className="w-full mt-2"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
