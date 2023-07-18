import { createSlice } from "@reduxjs/toolkit";

const historyItems = localStorage.getItem("historyItems")
  ? JSON.parse(localStorage.getItem("historyItems"))
  : [];

const initialState = {
  historyItems,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    getItemFromHistory(state, action) {
      return historyItems.find((x) => x.asin === action.payload);
    },
  },
});

export const { getItemFromHistory } = historySlice.actions;

export default historySlice.reducer;
