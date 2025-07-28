import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
