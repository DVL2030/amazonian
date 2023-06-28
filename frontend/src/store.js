import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import userRegisterSlice from "./slice/userRegisterSlice";
import amazonSlice from "./slice/amazonSlice";
import cartSlice from "./slice/cartSlice";
import historySlice from "./slice/historySlice";

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
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  history: {
    historyItems: localStorage.getItem("historyItems")
      ? JSON.parse(localStorage.getItem("historyItems"))
      : [],
  },
};

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    userRegister: userRegisterSlice,
    amazon: amazonSlice,
    cart: cartSlice,
    history: historySlice,
  },
  preloadedState: initialState,
});
