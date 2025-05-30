import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import modalReducer from './slices/modalSlice';

// 액션 로깅 미들웨어
const actionLogger = (store: any) => (next: any) => (action: any) => {
  console.group(`🚀 [REDUX] Action Dispatched: ${action.type}`);
  console.log('⏰ Timestamp:', new Date().toLocaleTimeString());
  console.log('📦 Action:', action);
  console.log('🔄 Previous State:', store.getState());
  
  const result = next(action);
  
  console.log('✅ New State:', store.getState());
  console.groupEnd();
  
  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
