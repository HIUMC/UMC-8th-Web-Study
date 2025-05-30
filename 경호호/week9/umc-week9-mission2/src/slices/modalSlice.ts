import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalState } from '../types';

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string }>) => {
      console.group('🔔 [MODAL] Open Modal');
      console.log('📝 Action payload:', action.payload);
      console.log('🔄 Previous state:', { isOpen: state.isOpen, modalType: state.modalType });
      
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      
      console.log('✅ New state:', { isOpen: state.isOpen, modalType: state.modalType });
      console.groupEnd();
    },
    closeModal: (state) => {
      console.group('🔔 [MODAL] Close Modal');
      console.log('🔄 Previous state:', { isOpen: state.isOpen, modalType: state.modalType });
      
      state.isOpen = false;
      state.modalType = null;
      
      console.log('✅ New state:', { isOpen: state.isOpen, modalType: state.modalType });
      console.groupEnd();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
