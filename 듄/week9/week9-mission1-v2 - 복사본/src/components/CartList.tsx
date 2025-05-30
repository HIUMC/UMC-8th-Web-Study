import CartItem from './CartItem';
import { useCartInfo } from '../hooks/useCartStore';

const CartList = () => {
  const {cartItems} = useCartInfo();
  /* 이 함수는 PriceBox 컴포넌트로 이동했으므로 CartList에서는 제거함.
  const {clearCart} = useCartActions();

  const handleClearCart = () => {
    clearCart();
  };
  */

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