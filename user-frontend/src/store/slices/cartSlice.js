import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cart: (state, action) => {
      state.items = action.payload;
      state.total = state.items.reduce((total, item) => total + item.price, 0);
    },
    onBuy: (state, action) => {
      state.items = action.payload;
      state.total = state.items.reduce((total, item) => total + item.price, 0);
    },
    removeItem: (state, action) => {
      // Filter out the item with the given ID
      state.items = state.items.filter(item => item._id !== action.payload);
      // Recalculate the total after removal
      state.total = state.items.reduce((total, item) => total + item.price, 0);
    }
  },
});

export const { cart, onBuy, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
