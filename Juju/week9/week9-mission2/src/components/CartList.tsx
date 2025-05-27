import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-4xl font-light mb-6 text-sky-400 py-4">🎶 Favorite Music 🎶</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;