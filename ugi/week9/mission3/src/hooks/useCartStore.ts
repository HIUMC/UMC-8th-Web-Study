import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import type { Lp } from "../types/cart";
import cartItems from "../constants/cartItems";

// 상태 정의
interface CartState {
  cartItems: Lp[];
  amount: number;
  total: number;
}

// 액션 정의
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 전체 store 타입
type Store = CartState & CartActions;

export const useCartStore = create<Store>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    increase: (id) => {
      set((state) => {
        const item = state.cartItems.find((i) => i.id === id);
        if (item) item.amount += 1;

        // 내부에서 totals 계산
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((i) => {
          amount += i.amount;
          total += i.amount * i.price;
        });
        state.amount = amount;
        state.total = total;
      });
    },

    decrease: (id) => {
      set((state) => {
        const item = state.cartItems.find((i) => i.id === id);
        if (item && item.amount > 0) item.amount -= 1;

        let amount = 0;
        let total = 0;
        state.cartItems.forEach((i) => {
          amount += i.amount;
          total += i.amount * i.price;
        });
        state.amount = amount;
        state.total = total;
      });
    },

    removeItem: (id) => {
      set((state) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);

        let amount = 0;
        let total = 0;
        state.cartItems.forEach((i) => {
          amount += i.amount;
          total += i.amount * i.price;
        });
        state.amount = amount;
        state.total = total;
      });
    },

    clearCart: () => {
      set((state) => {
        state.cartItems = [];
        state.amount = 0;
        state.total = 0;
      });
    },

    calculateTotals: () => {
      set((state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((i) => {
          amount += i.amount;
          total += i.amount * i.price;
        });
        state.amount = amount;
        state.total = total;
      });
    },
  }))
);

// 상태만 구독하는 hook
export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

// 액션만 구독하는 hook
export const useCartActions = () =>
  useCartStore(
    useShallow((state) => ({
      increase: state.increase,
      decrease: state.decrease,
      removeItem: state.removeItem,
      clearCart: state.clearCart,
      calculateTotals: state.calculateTotals, //  추가됨
    }))
  );
