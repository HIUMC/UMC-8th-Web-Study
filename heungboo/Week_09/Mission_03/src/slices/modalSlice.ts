// modal 을 열었는 지 유무로 판단

import { createSlice } from "@reduxjs/toolkit";
import { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

// 타입 정의
interface ModalState {
  cartItems: CartItems;
  isOpen: boolean;
}

// 초기 값 정의
const initialState: ModalState = {
  cartItems: cartItems,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { openModal, closeModal, clearCart } = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
