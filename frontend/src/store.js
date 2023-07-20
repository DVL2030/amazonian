import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import userRegisterSlice from "./slice/userRegisterSlice";
import amazonSlice from "./slice/amazonSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";
import favouriteSlice from "./slice/favouriteSlice";
import stripeSlice from "./slice/stripeSlice";
import adminSlice from "./slice/adminSlice";
import productSlice from "./slice/productSlice";

const initialState = {
  userAuth: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  amazon: {
    amazonHome: sessionStorage.getItem("amazonHome")
      ? JSON.parse(sessionStorage.getItem("amazonHome"))
      : null,
  },
  cart: {
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
    shippingAddress: sessionStorage.getItem("shippingAddress")
      ? JSON.parse(sessionStorage.getItem("shippingAddress"))
      : null,
    orderInfo: sessionStorage.getItem("orderInfo")
      ? JSON.parse(sessionStorage.getItem("orderInfo"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    userRegister: userRegisterSlice,
    user: userSlice,
    amazon: amazonSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    favourite: favouriteSlice,
    stripe: stripeSlice,
    admin: adminSlice,
  },
  preloadedState: initialState,
});
