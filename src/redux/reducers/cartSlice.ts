import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '~/utils/types';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find(item => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          id: action.payload.id,
          title: action.payload.title,
          author: action.payload.author,
          image: action.payload.image,
          price: action.payload.price,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);

      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  hydrateCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
