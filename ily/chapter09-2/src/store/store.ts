import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlices";
import modalReducer from "../slices/modalSlice";
//1. 저장소를 생성
function createStore() {
  const store = configureStore({
    //2.리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

//스토어를 외부에서 사용할 수 있도록 전달해줘야 함. export해줘야 한다는 말임.
//singleTon패턴으로 작성한 것이라고 볼 수 있다.
const store = createStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
