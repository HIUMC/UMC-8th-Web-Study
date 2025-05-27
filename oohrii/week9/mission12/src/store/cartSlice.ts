import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartitems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let price = 0;
      state.items.forEach(item => {
        amount += item.amount;
        price += Number(item.price) * item.amount;
      });
      state.totalAmount = amount;
      state.totalPrice = price;
    },
  },
});

export const { increment, decrement, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer; 