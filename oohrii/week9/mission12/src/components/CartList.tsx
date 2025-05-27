import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { increment, decrement, removeItem, clearCart, calculateTotals } from '../store/cartSlice';
import { openModal } from '../store/modalSlice';
import { useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

const CartList = () => {
  const { items, totalAmount, totalPrice } = useSelector((state: RootState) => state.cart);
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">장바구니가 비어 있습니다.</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {isModalOpen && (
        <ConfirmModal onConfirm={() => dispatch(clearCart())} />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">장바구니</h2>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => dispatch(openModal())}
        >전체 삭제</button>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b py-4">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
            <div className="flex-1">
              <div className="font-bold text-lg">{item.title}</div>
              <div className="text-gray-600">{item.singer}</div>
              <div className="font-bold mt-1">₩{item.price}</div>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => dispatch(decrement(item.id))}
              >-</button>
              <span className="mx-2">{item.amount}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => dispatch(increment(item.id))}
              >+</button>
            </div>
            <button
              className="ml-4 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-100"
              onClick={() => dispatch(removeItem(item.id))}
            >삭제</button>
          </div>
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