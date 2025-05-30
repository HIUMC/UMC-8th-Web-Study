import { create } from 'zustand';
import { LP, CartItems } from '../types';
import { cartItems } from '../constants';

interface PlaylistState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isLoading: boolean;
  
  // Actions
  clearCart: () => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  calculateTotals: () => void;
  initializeCart: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,

  clearCart: () => {
    console.group('🎵 [PLAYLIST] Clear Cart');
    const currentItems = get().cartItems;
    console.log('📊 Clearing cart with', currentItems.length, 'items');
    console.log('💿 Items being removed:', currentItems.map(item => ({ id: item.id, title: item.title, amount: item.amount })));
    
    set({ cartItems: [] });
    console.log('✅ Cart cleared successfully');
    
    get().calculateTotals();
    console.groupEnd();
  },

  removeItem: (id: string) => {
    console.group('🎵 [PLAYLIST] Remove Item');
    console.log('📝 Removing item with id:', id);
    
    const currentItems = get().cartItems;
    const itemToRemove = currentItems.find(item => item.id === id);
    
    if (itemToRemove) {
      console.log('🗑️ Removing item:', itemToRemove.title);
      console.log('📦 Item details:', { ...itemToRemove });
    } else {
      console.warn('⚠️ Item not found with id:', id);
    }
    
    const newCartItems = currentItems.filter((item) => item.id !== id);
    console.log(`📊 Cart size: ${currentItems.length} → ${newCartItems.length}`);
    
    set({ cartItems: newCartItems });
    get().calculateTotals();
    console.groupEnd();
  },

  increase: (id: string) => {
    console.group('🎵 [PLAYLIST] Increase Item');
    console.log('📝 Increasing item with id:', id);
    
    const currentItems = get().cartItems;
    const targetItem = currentItems.find(item => item.id === id);
    
    if (targetItem) {
      console.log(`📊 Item "${targetItem.title}" quantity: ${targetItem.amount} → ${targetItem.amount + 1}`);
    }
    
    const newCartItems = currentItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, amount: item.amount + 1 };
        console.log('💿 Updated item:', updatedItem);
        return updatedItem;
      }
      return item;
    });
    
    set({ cartItems: newCartItems });
    get().calculateTotals();
    console.groupEnd();
  },

  decrease: (id: string) => {
    console.group('🎵 [PLAYLIST] Decrease Item');
    console.log('📝 Decreasing item with id:', id);
    
    const currentItems = get().cartItems;
    const targetItem = currentItems.find(item => item.id === id);
    
    if (targetItem) {
      console.log(`📊 Item "${targetItem.title}" quantity: ${targetItem.amount} → ${targetItem.amount - 1}`);
      if (targetItem.amount - 1 === 0) {
        console.log('🗑️ Item will be removed (quantity = 0)');
      }
    }
    
    const newCartItems = currentItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, amount: item.amount - 1 };
        console.log('💿 Updated item:', updatedItem);
        return updatedItem;
      }
      return item;
    }).filter((item) => item.amount !== 0);
    
    console.log(`📊 Cart size after filtering: ${currentItems.length} → ${newCartItems.length}`);
    
    set({ cartItems: newCartItems });
    get().calculateTotals();
    console.groupEnd();
  },

  calculateTotals: () => {
    console.group('🎵 [PLAYLIST] Calculate Totals');
    
    const { cartItems } = get();
    const previousState = { amount: get().amount, total: get().total };
    
    let amount = 0;
    let total = 0;
    
    console.log('📊 Calculating totals for items:', cartItems.length);
    
    cartItems.forEach((item) => {
      const itemTotal = item.amount * item.price;
      amount += item.amount;
      total += itemTotal;
      console.log(`💿 ${item.title}: ${item.amount} × ₩${item.price.toLocaleString()} = ₩${itemTotal.toLocaleString()}`);
    });
    
    console.log(`📊 Total quantity: ${previousState.amount} → ${amount}`);
    console.log(`💰 Total price: ₩${previousState.total.toLocaleString()} → ₩${total.toLocaleString()}`);
    
    set({ amount, total });
    console.groupEnd();
  },

  initializeCart: () => {
    console.group('🎵 [PLAYLIST] Initialize Cart');
    console.log('🚀 Loading initial cart data...');
    console.log('📦 Initial items:', cartItems.length, 'albums');
    console.log('💿 Albums:', cartItems.map(item => ({ id: item.id, title: item.title, amount: item.amount })));
    
    set({ cartItems: cartItems, isLoading: false });
    console.log('✅ Cart initialized successfully');
    
    get().calculateTotals();
    console.groupEnd();
  },
}));
