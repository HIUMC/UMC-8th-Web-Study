import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  
  // Actions
  openModal: (type: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,

  openModal: (type: string) => {
    set({ isOpen: true, modalType: type });
  },

  closeModal: () => {
    set({ isOpen: false, modalType: null });
  },
}));
