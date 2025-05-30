import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const {amount, cartItems} = useCartInfo();
  const {calculateTotal} = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

  return (
    <div className='flex justify-between items-center p-4 bg-[#759465] text-gray-800'>
      <h1
        onClick={() => {
          window.location.href = '/';
        }}
        className = 'text-2xl font-semibold cursor-pointer'>DUNE
      </h1>
      <div className= 'flex items-center space-x-1'>
        <FaShoppingCart className='text-2xl'/>
        <span className='text-xl font-semibold'>{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;