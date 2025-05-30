import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types';
import { cartItems } from '../constants/cartItems';

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      console.group('🛒 [CART] Increase Item');
      console.log('📝 Action payload:', action.payload);
      
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        const oldAmount = cartItem.amount;
        cartItem.amount += 1;
        console.log(`📊 Item "${cartItem.title}" quantity: ${oldAmount} → ${cartItem.amount}`);
        console.log('💿 Updated item:', { ...cartItem });
      } else {
        console.warn('⚠️ Item not found with id:', action.payload.id);
      }
      console.groupEnd();
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      console.group('🛒 [CART] Decrease Item');
      console.log('📝 Action payload:', action.payload);
      
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        const oldAmount = cartItem.amount;
        cartItem.amount -= 1;
        console.log(`📊 Item "${cartItem.title}" quantity: ${oldAmount} → ${cartItem.amount}`);
        console.log('💿 Updated item:', { ...cartItem });
      } else {
        console.warn('⚠️ Item not found with id:', action.payload.id);
      }
      console.groupEnd();
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      console.group('🛒 [CART] Remove Item');
      console.log('📝 Action payload:', action.payload);
      
      const itemToRemove = state.cartItems.find(item => item.id === action.payload.id);
      if (itemToRemove) {
        console.log('🗑️ Removing item:', itemToRemove.title);
        console.log('📦 Item details:', { ...itemToRemove });
      }
      
      const oldLength = state.cartItems.length;
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      console.log(`📊 Cart size: ${oldLength} → ${state.cartItems.length}`);
      console.groupEnd();
    },
    clearCart: (state) => {
      console.group('🛒 [CART] Clear All Items');
      console.log('📊 Clearing cart with', state.cartItems.length, 'items');
      console.log('💿 Items being removed:', state.cartItems.map(item => ({ id: item.id, title: item.title, amount: item.amount })));
      
      state.cartItems = [];
      console.log('✅ Cart cleared successfully');
      console.groupEnd();
    },
    calculateTotals: (state) => {
      console.group('🛒 [CART] Calculate Totals');
      
      let amount = 0;
      let total = 0;
      
      console.log('📊 Calculating totals for items:', state.cartItems.length);
      
      state.cartItems.forEach(item => {
        const itemTotal = item.amount * item.price;
        amount += item.amount;
        total += itemTotal;
        console.log(`💿 ${item.title}: ${item.amount} × ₩${item.price.toLocaleString()} = ₩${itemTotal.toLocaleString()}`);
      });
      
      const oldAmount = state.amount;
      const oldTotal = state.total;
      
      state.amount = amount;
      state.total = total;
      
      console.log(`📊 Total quantity: ${oldAmount} → ${amount}`);
      console.log(`💰 Total price: ₩${oldTotal.toLocaleString()} → ₩${total.toLocaleString()}`);
      console.groupEnd();
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
