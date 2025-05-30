import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types';
import { cartItems } from '../constants/cartItems';

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.amount += 1;
        console.log(`➕ ${cartItem.title}: ${cartItem.amount - 1} → ${cartItem.amount}`);
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.amount -= 1;
        console.log(`➖ ${cartItem.title}: ${cartItem.amount + 1} → ${cartItem.amount}`);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemToRemove = state.cartItems.find(item => item.id === action.payload.id);
      if (itemToRemove) {
        console.log(`🗑️ Removed: ${itemToRemove.title}`);
      }
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      console.log(`🧹 Cart cleared (${state.cartItems.length} items removed)`);
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      
      state.amount = amount;
      state.total = total;
      
      console.log(`📊 Total: ${amount}개 ₩${total.toLocaleString()}`);
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
