// src/components/CartList.tsx
import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 ? (
        <p className="my-10 text-2xl font-semibold">장바구니가 비어있습니다.</p>
      ) : (
        <ul className="my-10">
          {cartItems.map((item: Lp) => (
            <CartItem key={item.id} lp={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
