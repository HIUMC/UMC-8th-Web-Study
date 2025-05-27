import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";
const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-white font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Heungboo Shop
        </div>
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-white text-2xl" />
          <span className="text-white ml-2">Cart : {amount}</span>
          <a href="/about" className="text-gray-300 hover:text-white px-3">
            About
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white px-3">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
