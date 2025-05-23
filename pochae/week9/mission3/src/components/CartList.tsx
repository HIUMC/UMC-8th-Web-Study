import CartItem from "./CartItem"
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartActions();

  const handleAllClearButton = () => {
    clearCart();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
        {cartItems.length === 0 && (
          <div className='my-10'>
            <p className='text-2xl font-semibold'>장바구니가 비었습니다.</p>
          </div>
        )}
        <ul>
          {cartItems.map((item, index)=>(
            <CartItem key={index} lp={item} />
          ))}
        </ul>
        <button 
          onClick={handleAllClearButton}
          className="p-4 border rounded-md my-10">
          전체 삭제
        </button>
    </div>
  )
}

export default CartList
