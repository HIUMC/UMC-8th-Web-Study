import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

const store = createStore();
export default store;

// 사용법
// App.tsx 에서 Provider 컴포넌트를 사용하여 store를 전달합니다.

// ******************************** 타입 받기용 ****************************
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// 사용법
// useCustomRedux.tsx hook 에서 다시 정의하면서, 타입 추론이 가능하도록함.
// ************************************************************************/
