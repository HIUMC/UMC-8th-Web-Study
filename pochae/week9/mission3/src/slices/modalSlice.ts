import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false,
}

const modalSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // TODO: 모달 띄우기
        showModal: (state) => {
            state.isOpen = true;
        },
        // TODO: 모달 닫기
        hideModal: (state) => {
            state.isOpen = false;
        },
    },
})

export const {showModal, hideModal} = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;