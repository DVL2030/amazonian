import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      try {
        const newCart = [...cartItems, action.payload];
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
    removeItemFromCart(state, action) {
      try {
        const newCart = [
          ...cartItems.filter((x) => x.asin !== action.payload.asin),
        ];
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        setTimeout(() => {}, 500);
      } catch (error) {
        state.error = error.message;
      }
    },
    updateCartQuantity(state, action) {
      try {
        let selectedItem = {
          ...cartItems.find((x) => x.asin === action.payload.asin),
        };
        selectedItem.qty = action.payload.qty;

        const newCart = [
          ...cartItems.filter((x) => x.asin !== action.payload.asin),
          selectedItem,
        ];
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
