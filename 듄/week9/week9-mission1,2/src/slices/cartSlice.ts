import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

export interface CartState {
  cartItems: CartItems; // 타입 정의
  amount: number;
  total: number;
}


const initialState: CartState = {
  cartItems: cartItems, // 초기 상태 설정
  amount : 0,
  total : 0,
}

//cartSlice 생성
const cartSlice = createSlice({
  name : 'cart',
  initialState,
  reducers: {
    // TODO: 증가
    increase : (state, action: PayloadAction<{id:string}>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if(item) {
        item.amount += 1;
      }
    },

    // TODO: 감소
    decrease : (state, action: PayloadAction<{id:string}>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if(item) {
        item.amount -= 1;
      }
    },

    // TODO: reomoveItem 아이템 제거
    removeItem : (state, action: PayloadAction<{id:string}>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
    },

    // TODO: clearCart 모든 아이템 제거
    clearCart : (state) => {
      state.cartItems = [];
    },

    // TODO: 총 가격 계산
    calculateTotal : (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      })
      
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {increase, decrease, removeItem, clearCart, calculateTotal} = cartSlice.actions;

//duck pattern reducer는 export default로 내보내야 함.
const cartReducer = cartSlice.reducer;

export default cartReducer;