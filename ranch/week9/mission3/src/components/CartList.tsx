import { useCartActions, useCartInfo } from '../hooks/useCartStore';
import CartItem from "./CartItem";

const CartList = () => {
  const {cartItems} = useCartInfo();
  const {clearCart} = useCartActions();

  const handleAllClearButton = () =>{
    clearCart();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl font-bold text-gray-700">장바구니가 비어있습니다.</p>
          </div>)}
      <ul>
        {cartItems.map((item)=>(
        <CartItem key = {item.id} lp={item}/>
      ))}
      </ul>
      <button
        onClick={handleAllClearButton}
        className="mt-8 bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer">
          전체 삭제</button>      
    </div>
  ) 
}

export default CartList;