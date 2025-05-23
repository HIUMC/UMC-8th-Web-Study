import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItems } from "../types/cart";
import cartItems from "../constant/cartItems";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

//cartSlice 생성
//createSlice ->reduxToolkit에서 생성

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //this is about actions.
    //todo increment
    increment: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      //이 아이디를 통해서, 전체 음반 중에서 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },

    //todo decrement
    decrement: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      //이 아이디를 통해서, 전체 음반 중에서 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item && item.amount > 0) {
        item.amount -= 1;
      }
    },

    //todo remove item
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId,
      );
    },

    //todo clearCart(empty cart)
    clearCart: (state) => {
      state.cartItems = [];
    },

    //todo calculateTotal
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  }, // 이렇게 만든 actions을 export해줘야 사용할 수 있음.
});

export const { increment, decrement, removeItem, clearCart, calculateTotal } =
  cartSlice.actions;

//duck pattern reducer는 exportdefault로 export해줘야 함.
const cartReducer = cartSlice.reducer;

export default cartReducer;
