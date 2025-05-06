
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from '../types/product';

interface StatsCardsProps {
  products: Product[];
  totalItems: number;
  inventoryValue: number;
  lowStockCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  products, 
  totalItems, 
  inventoryValue,
  lowStockCount 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total de Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products.length} produtos</div>
          <div className="text-xs text-muted-foreground">
            {totalItems} itens em estoque
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Valor do Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            }).format(inventoryValue)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Produtos com Estoque Baixo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowStockCount}</div>
          <div className="text-xs text-muted-foreground">
            Menos de 10 unidades
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
