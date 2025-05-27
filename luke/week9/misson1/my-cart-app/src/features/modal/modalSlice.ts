import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalProps } from './modalTypes';

type modalState = ModalProps;
const initialState: modalState = {
  isOpen: false, 
  message: '',
  confirmAction: ''
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 모달 열기
    openModal(state, action: PayloadAction<{ message: string; confirmAction: string }>) {
      console.log('모달 열기:', action.payload);
      state.isOpen = true;
      state.message = action.payload.message;
      state.confirmAction = action.payload.confirmAction;
    },
    // 모달 닫기
    closeModal(state) {
      state.isOpen = false;
      state.message = '';
      state.confirmAction = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
