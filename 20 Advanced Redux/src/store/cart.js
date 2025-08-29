import { createSlice } from "@reduxjs/toolkit";

import { showNotification } from "./ui";

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

export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://advanced-redux-4262f-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
