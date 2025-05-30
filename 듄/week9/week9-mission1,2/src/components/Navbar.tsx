import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotal } from "../slices/cartSlice";

const Navbar = () => {
  const {amount, cartItems} = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

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