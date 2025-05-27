import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartListProps, CartItem } from './cartTypes';
import cartItems from '../../constants/cartItems';

type CartState = CartListProps;

const initialState: CartState = {
  items: cartItems,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 증가
    increase(state, action: PayloadAction<string>) {
      const item = state.items.find((i: CartItem) => i.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    // 감소
    decrease(state, action: PayloadAction<string>) {
      const item = state.items.find((i: CartItem) => i.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          cartSlice.caseReducers.removeItem(state, action);   //  스코프정의를 위해 이렇게 써야함
        }
      }
    },
    // 아이템 제거  
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i: CartItem) => i.id !== action.payload);
    },
    // 전체 제거
    clearCart(state) {
      state.items = [];
    },
    // 총갯수, 총액 계산
    calculateTotals(state) {
      let totalQty = 0;
      let totalAmt = 0;
      state.items.forEach(item => {
        totalQty += item.amount;
        totalAmt += item.amount * parseInt(item.price, 10);
      });
      state.totalQuantity = totalQty;
      state.totalAmount = totalAmt;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
