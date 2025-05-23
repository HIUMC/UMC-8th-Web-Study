import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartInfo, useCartActions } from "../hooks/useCartStore";

const Navbar = () => {
  //
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();
  // const { amount, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <h1
        className="text-2xl font-semibold"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        seokhoon
      </h1>
      <div className=" flex items-center space-x-2">
        <FaShoppingCart />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
