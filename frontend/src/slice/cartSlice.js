import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const orderInfo = localStorage.getItem("orderInfo")
  ? JSON.parse(localStorage.getItem("orderInfo"))
  : null;

const initialState = {
  cartItems,
  shippingAddress,
  orderInfo,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      try {
        let newCart;
        if (cartItems.find((item) => item.asin === action.payload.asin)) {
          newCart = cartItems.map((x) => {
            if (x.asin === action.payload.asin) {
              return {
                ...x,
                qty: action.payload.qty,
              };
            }
            return x;
          });
        } else {
          newCart = [...cartItems, action.payload];
        }
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        state.cartItems = newCart;
      } catch (error) {
        state.error = error.message;
      }
    },
    removeItemFromCart(state, action) {
      try {
        const newCart = cartItems.filter((x) => x.asin !== action.payload.asin);
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        state.cartItems = newCart;
      } catch (error) {
        state.error = error.message;
      }
    },
    updateCartQuantity(state, action) {
      try {
        const newCart = cartItems.map((x) => {
          if (x.asin === action.payload.asin) {
            return {
              ...x,
              qty: action.payload.qty,
            };
          } else return { ...x };
        });

        state.cartItems = newCart;
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
    saveShippingAddress(state, action) {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    saveOrderInfo(state, action) {
      localStorage.setItem("orderInfo", JSON.stringify(action.payload));
    },
  },
});

export const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
  saveShippingAddress,
  saveOrderInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
