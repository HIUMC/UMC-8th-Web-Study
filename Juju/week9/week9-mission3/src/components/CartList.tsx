import { /*useCartActions,*/ useCartInfo } from "../hooks/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useCartInfo();
  // const { clearCart } = useCartActions();

  /*
  const handleAllClearButton = () => {
    clearCart();
  };
  */

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-4xl font-light mb-6 text-sky-400 py-4">🎶 Favorite Music 🎶</h2>
      {cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl font-bold text-gray-700">
            장바구니가 비어있습니다.
          </p>
        </div>
      )}
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;