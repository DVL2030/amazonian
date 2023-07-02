import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import userRegisterSlice from "./slice/userRegisterSlice";
import amazonSlice from "./slice/amazonSlice";
import cartSlice from "./slice/cartSlice";
import historySlice from "./slice/historySlice";
import userSlice from "./slice/userSlice";

const initialState = {
  userAuth: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  amazon: {
    amazonHome: localStorage.getItem("amazonHome")
      ? JSON.parse(localStorage.getItem("amazonHome"))
      : null,
  },
  cart: {
    cart: [],
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    userRegister: userRegisterSlice,
    user: userSlice,
    amazon: amazonSlice,
    cart: cartSlice,
  },
  preloadedState: initialState,
});
