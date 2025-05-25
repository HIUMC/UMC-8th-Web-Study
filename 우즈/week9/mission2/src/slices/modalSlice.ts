import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // TODO: 모달 켜기
    onModal: (state) => {
      state.isOpen = true;
    },
    // TODO: 모달 끄기
    offModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onModal, offModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
