import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const {amount, cartItems} = useCartInfo();
  const {calculateTotals} = useCartActions();

  useEffect(() => {
    calculateTotals();
  }
  , [cartItems, calculateTotals]);
  

  
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white ">
      <h1 onClick={()=>{
        window.location.href = "/"; // 홈으로 이동
      }} className="text-2xl font-semibold cursor-pointer">Navbar</h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl"/>
        <span className="text-2xl font-medium">{amount}</span>
      </div>
    </div>
  ); 
}

export default Navbar;
