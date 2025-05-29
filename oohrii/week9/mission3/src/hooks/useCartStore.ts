import { create } from 'zustand';
import type { CartItem } from '../types/cart';
import cartItemsData from '../constants/cartitems';

interface CartState {
  items: CartItem[];
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalAmount: number;
  totalPrice: number;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: cartItemsData.map(item => ({ ...item, price: Number(item.price) })),
  increase: (id) => set(state => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    )
  })),
  decrease: (id) => set(state => ({
    items: state.items
      .map(item =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      )
      .filter(item => item.amount > 0)
  })),
  remove: (id) => set(state => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clear: () => set({ items: [] }),
  totalAmount: 0,
  totalPrice: 0,
  calculateTotals: () => {
    const { items } = get();
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.amount * item.price, 0);
    set({ totalAmount, totalPrice });
  }
})); 