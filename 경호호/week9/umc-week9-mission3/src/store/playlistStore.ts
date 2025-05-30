import { create } from 'zustand';
import { LP, CartItems } from '../types';
import { cartItems } from '../constants';

interface PlaylistState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isLoading: boolean;
  
  // Actions
  clearCart: () => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  calculateTotals: () => void;
  initializeCart: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,

  clearCart: () => {
    set({ cartItems: [] });
    get().calculateTotals();
  },

  removeItem: (id: string) => {
    const newCartItems = get().cartItems.filter((item) => item.id !== id);
    set({ cartItems: newCartItems });
    get().calculateTotals();
  },

  increase: (id: string) => {
    const newCartItems = get().cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    set({ cartItems: newCartItems });
    get().calculateTotals();
  },

  decrease: (id: string) => {
    const newCartItems = get().cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    }).filter((item) => item.amount !== 0);
    
    set({ cartItems: newCartItems });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cartItems } = get();
    let amount = 0;
    let total = 0;
    
    cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * item.price;
    });
    
    set({ amount, total });
  },

  initializeCart: () => {
    set({ cartItems: cartItems, isLoading: false });
    get().calculateTotals();
  },
}));
