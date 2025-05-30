import { useEffect } from 'react';
import { usePlaylistStore } from '../store/playlistStore';
import { useModalStore } from '../store/modalStore';
import CartItem from './CartItem';
import type { LP } from '../types';

const CartList = () => {
  const { cartItems, total, initializeCart } = usePlaylistStore();
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    console.log('🎵 [COMPONENT] CartList mounted - initializing cart');
    initializeCart();
  }, [initializeCart]);

  const handleClearCart = () => {
    console.log('🖱️ [USER ACTION] Clear cart button clicked (Zustand)');
    console.log('📊 Current cart state:', { itemCount: cartItems.length, total });
    openModal('clearCart');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">장바구니가 비어있어요</h2>
          <p className="text-gray-500 text-lg">좋아하는 음반을 담아보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">당신이 선택한 음반</h2>
        <p className="text-center text-gray-500">총 {cartItems.length}개의 아이템</p>
      </div>
      
      <div className="space-y-4 mb-10">
        {cartItems.map((item: LP) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-700">총 결제금액</span>
          <span className="text-3xl font-bold text-blue-600">
            ₩{total.toLocaleString()}
          </span>
        </div>
        
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 text-lg">
            주문하기
          </button>
          <button
            onClick={handleClearCart}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-gray-200"
          >
            장바구니 비우기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
