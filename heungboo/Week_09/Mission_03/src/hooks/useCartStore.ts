import { CartItems } from "../types/cart";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

// action 에 대한 타입 정의
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 상태에 대한 타입 정의
interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;

  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _): CartState => ({
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
            if (cartItem && cartItem.amount > 0) {
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
        calculateTotals: () => {
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
    })
  )
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = () => useCartStore((state) => state.actions);

// 사용법
// 상태
// const { amount, cartItems } = useCartInfo();
// 액션
// const { calculateTotals } = useCartActions();
