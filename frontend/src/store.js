import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

const initialState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // preloadedState: initialState,
});
