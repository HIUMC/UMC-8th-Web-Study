import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  
  // Actions
  openModal: (type: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalType: null,

  openModal: (type: string) => {
    console.group('🔔 [MODAL] Open Modal');
    const previousState = { isOpen: get().isOpen, modalType: get().modalType };
    console.log('📝 Modal type:', type);
    console.log('🔄 Previous state:', previousState);
    
    set({ isOpen: true, modalType: type });
    
    const newState = { isOpen: get().isOpen, modalType: get().modalType };
    console.log('✅ New state:', newState);
    console.groupEnd();
  },

  closeModal: () => {
    console.group('🔔 [MODAL] Close Modal');
    const previousState = { isOpen: get().isOpen, modalType: get().modalType };
    console.log('🔄 Previous state:', previousState);
    
    set({ isOpen: false, modalType: null });
    
    const newState = { isOpen: get().isOpen, modalType: get().modalType };
    console.log('✅ New state:', newState);
    console.groupEnd();
  },
}));
