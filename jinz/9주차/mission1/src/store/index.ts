import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import modalReducer from './modalSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;