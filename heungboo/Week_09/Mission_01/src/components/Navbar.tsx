import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

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
