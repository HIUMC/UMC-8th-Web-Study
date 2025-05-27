import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

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
}  

const intialState: CartState = {
    cartItems,
    totalAmount: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: intialState,
    reducers:{
        increase: (state, action: PayloadAction<string>) => {
            const item= state.cartItems.find((item) => item.id === action.payload);
            if (item) item.amount += 1;
        },
        decrease: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if(item){
                if (item.amount > 1) item.amount -= 1;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if (item){
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        calculateTotals: (state) => {
            const {totalAmount, totalPrice} = state.cartItems.reduce(
                (acc, item) => {
                    acc.totalAmount += item.amount;
                    acc.totalPrice += item.amount * parseFloat(item.price);
                    return acc;
                },
                { totalAmount: 0, totalPrice: 0 } 
            )
            state.totalAmount = totalAmount;
            state.totalPrice = totalPrice;
        }
    }
})

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;