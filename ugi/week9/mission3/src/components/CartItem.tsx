// src/components/CartItem.tsx
import type { Lp } from "../types/cart";
import { useCartStore, useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();
  const cartItem = useCartStore((state) =>
    state.cartItems.find((item) => item.id === lp.id)
  );

  const handleIncreaseAmount = () => {
    increase(lp.id);
  };

  const handleDecreaseAmount = () => {
    if ((cartItem?.amount ?? 0) === 1) {
      removeItem(lp.id);
    } else {
      decrease(lp.id);
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={lp.img}
        alt={lp.title}
        className="w-20 h-20 mr-4 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price}원</p>
      </div>
      <div className="flex items-center">
        <button onClick={handleDecreaseAmount} className="px-3 py-1 bg-gray-300 rounded-l cursor-pointer">-</button>
        <span className="px-4 py-[3px] border-y border-gray-300">{cartItem?.amount ?? 0}</span>
        <button onClick={handleIncreaseAmount} className="px-3 py-1 bg-gray-300 rounded-r cursor-pointer">+</button>
      </div>
    </div>
  );
};

export default CartItem;
