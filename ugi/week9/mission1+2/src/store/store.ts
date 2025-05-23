import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice"; //  추가

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer, //  이제 이름 찾을 수 있음
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
