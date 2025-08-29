import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalQuantity++;
      state.changed = true;
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item === -1) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export const { addToCart, removeFromCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
