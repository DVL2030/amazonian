import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  getOrder: null,
  createOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderParam, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/order/create",
        data: orderParam,
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (res) {
        // localStorage.removeItem("cartItems");
        // localStorage.removeItem("shippingAddress");
        // localStorage.removeItem("orderInfo");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.createOrder = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
