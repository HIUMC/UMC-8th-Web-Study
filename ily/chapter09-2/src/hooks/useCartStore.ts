//결국에는 redux핵심 개념이고 aciton이랑 state를 나누어 관리하는 것이 매우 좋음,.
import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constant/cartItems";
import { useShallow } from "zustand/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void; // 따로 관리해줘야 하긴 함!!
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 1) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      caculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  })),
);
//zustand사용하는 방법 middleware chaining을 하기 위함..
//이렇게 되면 immer에 대해서 값을 작성해놓은 것임. 불변성을 유지하기 위해 작성한 것.
//불변성을 유지시키지 않았다면,

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);
//이렇게 actions를 따로 빼서 관리해주기.
