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
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.amount -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
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
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
