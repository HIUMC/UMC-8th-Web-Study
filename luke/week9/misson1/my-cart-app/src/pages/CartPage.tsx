// src/features/cart/pages/CartPage.tsx
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { calculateTotals } from '../features/cart/cartSlice'
import CartList from '../features/cart/CartList'

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, totalQuantity, totalAmount } = useSelector( (state: RootState) => state.cart)

  // 바뀔 때마다 calculateTotals 액션
  useEffect(() => {
    dispatch(calculateTotals())
  }, [items, dispatch])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">내 장바구니</h1>

      {/* CartList에 items와 summary 데이터만 전달 */}
      <CartList
        items={items}
        totalQuantity={totalQuantity}
        totalAmount={totalAmount}
      />
    </div>
  )
}

export default CartPage
