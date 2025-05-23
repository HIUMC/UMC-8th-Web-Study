import type { CartState } from "../slices/cartSlices";
import type { RootState } from "../store/store";
import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  const { cartItems, amount, total } = useSelector(
    (state: RootState): CartState => state.cart,
  ); //state만 찍어도 cart가 담겨있다는 type을 넣기 위해서,,,
  //type명시를 위해 redux-toolkit의 사용법을 통해서 명시화.

  console.log(cartItems);

  return (
    <div className="flex flex-col item-center justify-center">
      Cartlist
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;

//전역 상태로 관리해야하는 것들 -> 가격, lp의 갯수 -> , 카트에 담긴 갯수 등등,,, 여러가지가 존재함.
