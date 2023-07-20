import { createSlice } from "@reduxjs/toolkit";

const cartItems = sessionStorage.getItem("cartItems")
  ? JSON.parse(sessionStorage.getItem("cartItems"))
  : [];

const shippingAddress = sessionStorage.getItem("shippingAddress")
  ? JSON.parse(sessionStorage.getItem("shippingAddress"))
  : null;

const orderInfo = sessionStorage.getItem("orderInfo")
  ? JSON.parse(sessionStorage.getItem("orderInfo"))
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
        sessionStorage.setItem("cartItems", JSON.stringify(newCart));
        state.cartItems = newCart;
      } catch (error) {
        state.error = error.message;
      }
    },
    removeItemFromCart(state, action) {
      try {
        const newCart = cartItems.filter((x) => x.asin !== action.payload.asin);
        sessionStorage.setItem("cartItems", JSON.stringify(newCart));
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
        sessionStorage.setItem("cartItems", JSON.stringify(newCart));
      } catch (error) {
        state.error = error.message;
      }
    },
    saveShippingAddress(state, action) {
      sessionStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      state.shippingAddress = action.payload;
    },
    saveOrderInfo(state, action) {
      sessionStorage.setItem("orderInfo", JSON.stringify(action.payload));
      state.orderInfo = action.payload;
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
