import { FaShoppingCart } from 'react-icons/fa';
import { useCartActions, useCartInfo } from '../store/cartStore';
import { useEffect } from 'react';

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, cartItems]);
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => (window.location.href = '/')}
        className="text-2xl font-semibold cursor-pointer"
      >
        COLA
      </h1>
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
