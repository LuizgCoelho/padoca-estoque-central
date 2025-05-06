
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import StatsCards from '../components/StatsCards';
import { Product, ProductFormData } from '../types/product';
import { createProduct, calculateInventoryValue, getLowStockProducts } from '../utils/productUtils';
import { initialProducts } from '../data/initialProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Load initial products
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  // Add new product
  const handleAddProduct = (productData: ProductFormData) => {
    const newProduct = createProduct(productData);
    setProducts([...products, newProduct]);
  };

  // Increment product quantity
  const handleIncrement = (id: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
  };

  // Decrement product quantity
  const handleDecrement = (id: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    );
  };

  // Delete product
  const handleDelete = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: "Produto removido",
        description: `${productToDelete.name} foi removido do estoque`,
      });
    }
  };

  // Calculate statistics
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const inventoryValue = calculateInventoryValue(products);
  const lowStockProducts = getLowStockProducts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header productsCount={totalItems} />
      
      <main className="container mx-auto py-6 px-4">
        <StatsCards 
          products={products}
          totalItems={totalItems}
          inventoryValue={inventoryValue}
          lowStockCount={lowStockProducts.length}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <div className="lg:col-span-1">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos os Produtos</TabsTrigger>
                <TabsTrigger value="low">Estoque Baixo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ProductList
                  products={products}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                />
              </TabsContent>
              
              <TabsContent value="low">
                <ProductList
                  products={lowStockProducts}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
