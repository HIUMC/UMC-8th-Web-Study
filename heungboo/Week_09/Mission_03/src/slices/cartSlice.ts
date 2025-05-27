import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import { CartItems } from "../types/cart";

// 전체 관리를 위한 타입 정의
export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

// 전체 관리의 초기 값 정의
const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// 전체 관리하는 함수 정의
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },

    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.cartItems = state.cartItems.filter(
        (cartItems) => cartItems.id != itemId
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;

// 사용법
// createSlice 에서 정의한 name: "cart"으로 접근을 한다.

// const { amount, cartItems, total } = useSelector(
//    (state: RootState) => state.cart
//  );

// RootState 를 계속 쓰지 않도록 ( 사용 편의를 위해서 )
// useCustomRedux.tsx hook 이용
