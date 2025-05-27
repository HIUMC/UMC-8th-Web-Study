import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

function createStore() {
  const store = configureStore({
    // Redux Toolkit을 사용하여 스토어를 구성
    reducer: { cart: cartReducer },
  });

  return store;
}

const store = createStore();
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;