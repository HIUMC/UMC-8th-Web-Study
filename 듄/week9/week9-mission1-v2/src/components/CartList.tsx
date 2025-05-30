import CartItem from './CartItem';
import { useAppSelector } from '../hooks/useCustomRedux';

const CartList = () => {
  const { cartItems, amount, total } = useAppSelector((state) => state.cart);

  return (
    <div className = 'flex flex-col items-center justify-center'>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item}/>
        ))}
      </ul>
    </div>
  )
};

export default CartList;