import { createSlice } from "@reduxjs/toolkit";

const historyItems = localStorage.getItem("historyItems")
  ? JSON.parse(localStorage.getItem("historyItems"))
  : [];

const initialState = {
  historyItems,
};

const historySlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getItemFromHistory(state, action) {
      console.log(action.payload);
      return historyItems.find((x) => x.asin === action.payload);
    },
  },
});

export const { getItemFromHistory } = historySlice.actions;

export default historySlice.reducer;
