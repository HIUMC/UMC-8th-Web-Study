import React, { useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';
import CartItem from './CartItem';

const CartList = () => {
  const { items, clear, totalAmount, totalPrice, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">장바구니가 비어 있습니다.</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">장바구니</h2>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clear}
        >전체 삭제</button>
      </div>
      <div>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <div className="text-right">
          <div className="text-lg font-semibold">총 수량: {totalAmount}개</div>
          <div className="text-xl font-bold mt-1">총 금액: ₩{totalPrice.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default CartList;