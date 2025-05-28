import React, { useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';

const Navbar = () => {
  const { totalAmount, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">Oohrii</h1>
      <div className="flex items-center">
        <span className="text-2xl">🛒</span>
        <span className="ml-2">{totalAmount}</span>
      </div>
    </div>
  );
};

export default Navbar;