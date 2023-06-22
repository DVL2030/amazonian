import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import userRegisterSlice from "./slice/userRegisterSlice";
import amazonSlice from "./slice/amazonSlice";

const initialState = {
  userAuth: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    userRegister: userRegisterSlice,
    amazon: amazonSlice,
  },
  preloadedState: initialState,
});
