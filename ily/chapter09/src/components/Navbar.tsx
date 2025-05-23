import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotal } from "../slices/cartSlices";

const Navbar = () => {
  //
  const { amount, cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <h1
        className="text-2xl font-semibold"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        {" "}
        seokhoon{" "}
      </h1>
      <div className=" flex items-center space-x-2">
        <FaShoppingCart />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
