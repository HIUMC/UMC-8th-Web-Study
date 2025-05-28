import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
  const {amount, cartItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }
  , [cartItems, dispatch]);
  

  
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