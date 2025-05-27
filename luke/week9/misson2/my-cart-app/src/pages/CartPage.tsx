// src/features/cart/pages/CartPage.tsx
import React, { useEffect } from 'react'
import useCartStore from '../features/cart/useCartStore'
import CartList from '../features/cart/CartList'

const CartPage: React.FC = () => {
  const { items, totalQuantity, totalAmount, calculateTotals } = useCartStore();

  // 바뀔 때마다 calculateTotals 액션
  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">내 장바구니</h1>
      <CartList
        items={items}
        totalQuantity={totalQuantity}
        totalAmount={totalAmount}
      />
    </div>
  )
}

export default CartPage
