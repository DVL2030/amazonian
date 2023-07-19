import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import userRegisterSlice from "./slice/userRegisterSlice";
import amazonSlice from "./slice/amazonSlice";
import cartSlice from "./slice/cartSlice";
import historySlice from "./slice/historySlice";
import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";
import favouriteSlice from "./slice/favouriteSlice";
import stripeSlice from "./slice/stripeSlice";
import adminSlice from "./slice/adminSlice";

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
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,
    orderInfo: localStorage.getItem("orderInfo")
      ? JSON.parse(localStorage.getItem("orderInfo"))
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
    order: orderSlice,
    favourite: favouriteSlice,
    stripe: stripeSlice,
    admin: adminSlice,
  },
  preloadedState: initialState,
});
