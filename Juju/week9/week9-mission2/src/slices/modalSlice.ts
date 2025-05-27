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
    onModal: (state) => {
      state.isOpen = true;
    },
    offModal: (state) => {
      state.isOpen = false;
    },
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onModal, offModal, toggleModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;