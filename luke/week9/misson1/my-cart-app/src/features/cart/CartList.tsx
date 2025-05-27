import React from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { increase, decrease, removeItem} from '../cart/cartSlice'
import { openModal } from '../modal/modalSlice'
import type { CartListProps } from './cartTypes'

const CartList: React.FC<CartListProps> = ({ items, totalQuantity, totalAmount }) => {
  const dispatch = useDispatch<AppDispatch>()

  if (items.length === 0) {
    return <p className="text-center text-gray-500">장바구니가 비어있습니다.</p>
  }

  return (
    <div className="space-y-6">
      {/* 개별 아이템 리스트 */}
      {items.map(item => (
        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
          <img
            src={item.img}
            alt={item.title}
            className="w-16 h-16 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.singer}</p>
            <p className="mt-1 font-medium">{item.price}원</p>
            <div className="mt-2 flex items-center space-x-2">
              <button  onClick={() => dispatch(decrease(item.id))} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                – </button>
              <span className="px-2">{item.amount}</span>
              <button onClick={() => dispatch(increase(item.id))} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                + </button>
              <button onClick={() => dispatch(removeItem(item.id))} className="ml-4 text-red-500 hover:text-red-600"> 
               삭제</button>
            </div>
          </div>
        </div>
      ))}

      {/* 총총 정보 */}
      <div className="mt-6 flex justify-between text-lg font-medium">
        <span>총 수량: {totalQuantity}개</span>
        <span>총 금액: {totalAmount.toLocaleString()}원</span>
      </div>
      {/* 전체 삭제 버튼 */}
      <div className="flex justify-end">
        <button onClick={() => dispatch(openModal({
        message: '장바구니를 전부 비우시겠습니까?',
        confirmAction: 'cart/clearCart',
      }))} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          전체 삭제
        </button>
      </div>
    </div>
  )
}

export default CartList
