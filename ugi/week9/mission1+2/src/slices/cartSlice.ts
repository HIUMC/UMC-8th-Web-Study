import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { Lp as CartItem } from "../types/cart"; //

export interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>): void => {
      const item = state.cartItems.find((cartItem: CartItem) => cartItem.id === action.payload.id);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>): void => {
      const item = state.cartItems.find((cartItem: CartItem) => cartItem.id === action.payload.id);
      if (item) {
        item.amount -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>): void => {
      state.cartItems = state.cartItems.filter((cartItem: CartItem) => cartItem.id !== action.payload.id);
    },
    clearCart: (state): void => {
      state.cartItems = [];
    },
    calculateTotals: (state): void => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: CartItem) => {
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
