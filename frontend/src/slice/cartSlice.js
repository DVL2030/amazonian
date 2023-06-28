import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newCart = [...cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    },
    removeItemFromCart(state, action) {
      const newCart = [
        ...cartItems.filter((x) => x.asin !== action.payload.asin),
      ];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    },
    updateCartQuantity(state, action) {
      let selectedItem = {
        ...cartItems.find((x) => x.asin === action.payload.asin),
      };
      selectedItem.qty = action.payload.qty;

      const newCart = [
        ...cartItems.filter((x) => x.asin !== action.payload.asin),
        selectedItem,
      ];
      //   console.log(newCart);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
