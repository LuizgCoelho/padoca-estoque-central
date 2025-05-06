
import React from 'react';
import { Package } from "lucide-react";

interface HeaderProps {
  productsCount: number;
}

const Header: React.FC<HeaderProps> = ({ productsCount }) => {
  return (
    <header className="bg-bakery-bread text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Package size={32} />
          <div>
            <h1 className="text-3xl font-display font-bold">Padoca</h1>
            <p className="text-bakery-cream text-sm">Sistema de Estoque</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-bakery-crust px-4 py-2 rounded-lg">
            <span className="font-semibold">{productsCount}</span> produtos em estoque
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
