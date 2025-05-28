import React from 'react';
import type { CartItem as CartItemType } from '../types/cart';
import { useCartStore } from '../hooks/useCartStore';

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const { increase, decrease, remove } = useCartStore();

  return (
    <div className="flex items-center border-b py-4">
      <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
      <div className="flex-1">
        <div className="font-bold text-lg">{item.title}</div>
        <div className="text-gray-600">{item.singer}</div>
        <div className="font-bold mt-1">₩{item.price}</div>
      </div>
      <div className="flex items-center">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => decrease(item.id)}
        >-</button>
        <span className="mx-2">{item.amount}</span>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => increase(item.id)}
        >+</button>
      </div>
      <button
        className="ml-4 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-100"
        onClick={() => remove(item.id)}
      >삭제</button>
    </div>
  );
};

export default CartItem; 