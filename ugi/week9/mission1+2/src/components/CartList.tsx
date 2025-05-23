import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";
import type { RootState } from "../store/store";
import type { Lp } from "../types/cart"; //  Lp로 수정

const CartList = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item: Lp) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;



