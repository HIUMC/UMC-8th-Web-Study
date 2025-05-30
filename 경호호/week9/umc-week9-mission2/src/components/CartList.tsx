import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { calculateTotals } from '../slices/cartSlice';
import { openModal } from '../slices/modalSlice';
import CartItem from './CartItem';
import type { LP } from '../types';

const CartList = () => {
  const { cartItems, total } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleClearCart = () => {
    console.log('Clear cart button clicked!'); // 디버깅용
    dispatch(openModal({ modalType: 'clearCart' }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">장바구니가 비어있습니다</h2>
          <p className="text-gray-500">음반을 추가해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">당신이 선택한 음반</h2>
      
      <div className="space-y-4">
        {cartItems.map((item: LP) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">총 가격</span>
          <span className="text-2xl font-bold text-blue-600">
            ₩ {total.toLocaleString()}원
          </span>
        </div>
        
        <button
          onClick={handleClearCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default CartList;
