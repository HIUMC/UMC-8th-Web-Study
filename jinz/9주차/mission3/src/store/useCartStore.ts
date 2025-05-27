import { create } from "zustand";

interface CartItem {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
}

interface CartState {
    cartItems: CartItem[];
    totalAmount?: number;
    totalPrice?: number;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}  

import cartItemsData from "../constants/cartItems.ts";

export const useCartStore = create<CartState>((set: (partial: Partial<CartState> | ((state: CartState) => Partial<CartState>)) => void, get: () => CartState) => ({
    cartItems: cartItemsData,
    totalAmount: 0,
    totalPrice: 0,

    increase: (id: string) => {
        set((state: CartState) => ({
          cartItems: state.cartItems.map((item: CartItem) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
          ),
        }));
        get().calculateTotals();
      },
    
      decrease: (id: string) => {
        set((state: CartState) => ({
          cartItems: state.cartItems
            .map((item: CartItem) =>
              item.id === id && item.amount > 1
                ? { ...item, amount: item.amount - 1 }
                : item
            )
            .filter((item: CartItem) => item.amount > 0),
        }));
        get().calculateTotals();
      },
    
      removeItem: (id: string) => {
        set((state: CartState) => ({
          cartItems: state.cartItems.filter((item: CartItem) => item.id !== id),
        }));
        get().calculateTotals();
      },
    
      clearCart: () => {
        set({ cartItems: [] });
        get().calculateTotals();
      },
    
      calculateTotals: () => {
        const { cartItems } = get();
        const { totalAmount, totalPrice } = cartItems.reduce<{
          totalAmount: number;
          totalPrice: number;
        }>(
          (acc, item: CartItem) => {
            acc.totalAmount += item.amount;
            acc.totalPrice += parseFloat(item.price) * item.amount;
            return acc;
          },
          { totalAmount: 0, totalPrice: 0 }
        );
        set({ totalAmount, totalPrice });
      },
}) )