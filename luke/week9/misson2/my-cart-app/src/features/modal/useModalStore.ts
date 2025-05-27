import { create } from 'zustand';
import type { ModalProps } from './modalTypes';

type ModalValues = ModalProps;
type ModalActions = {
  openModal: (payload: { message: string; confirmAction: string }) => void;
  closeModal: () => void;
}
type ModalState = ModalValues & ModalActions;

const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    message: '',
    confirmAction: '',
    openModal: ({ message, confirmAction }) =>
        set(() => ({
            isOpen: true,
            message,
            confirmAction,
        })),
    closeModal: () => set(() => ({
        isOpen: false,
        message: '',
        confirmAction: '',
    })),
}));

export default useModalStore;