import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const initialState = {
  cartItems,
  cart: [],
  shippingAddress,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      try {
        state.cart.push(action.payload);
        const newCart = [...cartItems, action.payload];
        console.log(newCart);
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
    removeItemFromCart(state, action) {
      try {
        state.cart = state.cart.filter((x) => x.asin !== action.payload.asin);
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      } catch (error) {
        state.error = error.message;
      }
    },
    updateCartQuantity(state, action) {
      try {
        const newCart = state.cart.map((x) => {
          if (x.asin === action.payload.asin) {
            return {
              ...x,
              qty: action.payload.qty,
            };
          }
          return x;
        });

        state.cart = newCart;
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
    saveShippingAddress(state, action) {
      console.log(action.payload);
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
