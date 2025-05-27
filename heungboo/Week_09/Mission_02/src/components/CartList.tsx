import CartItems from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  // const { amount, cartItems, total } = useSelector(
  //   (state: RootState) => state.cart
  // );
  // const { amount, cartItems, total } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col items-center justify-center ">
      <ul>
        {cartItems.map((item) => (
          <CartItems key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};
export default CartList;
