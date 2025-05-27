import {create} from 'zustand';
import cartItems from '../../constants/cartItems';
import type { CartItem } from './cartTypes';

type CartState = {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
    items: cartItems,
    totalQuantity: 0,
    totalAmount: 0,
    increase: (id: string) =>
        set((state) => {
            const newItems = state.items.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );
            return { items: newItems };
        }),
    decrease: (id: string) =>
        set((state) => {
            // amount가 1 미만이면 제거처리
            const newItems = state.items
                .map((item) =>
                    item.id === id ? { ...item, amount: item.amount - 1 } : item
                )
                .filter((item) => item.amount > 0);
            return { items: newItems };
        }),
    removeItem: (id: string) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id)
        })),
    clearCart: () => set({ items: [] }),
    calculateTotals: () =>
        set((state) => {
            let totalQty = 0;
            let totalAmt = 0;
            state.items.forEach((item) => {
                totalQty += item.amount;
                totalAmt += item.amount * parseInt(item.price, 10);
            });
            return { totalQuantity: totalQty, totalAmount: totalAmt };
        }),
}));

export default useCartStore;