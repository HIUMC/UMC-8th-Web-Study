import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  onModal: () => void;
  offModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  onModal: () => set({ isOpen: true }),
  offModal: () => set({ isOpen: false }),
}));
