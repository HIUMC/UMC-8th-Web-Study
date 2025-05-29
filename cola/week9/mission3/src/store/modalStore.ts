import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;

  actions: ModalActions;
}

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,

  actions: {
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () => set(() => ({ isOpen: false })),
  },
}));

export const useModalInfo = () => useModalStore((state) => state.isOpen);

export const useModalActions = () => useModalStore((state) => state.actions);
