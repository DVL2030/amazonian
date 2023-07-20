import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  loading: false,
  error: null,
};

export const getOrder = createAsyncThunk(
  "order/get",
  async (orderId, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/order/get",
        data: { userId: userInfo._id, orderId: orderId },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
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
        sessionStorage.removeItem("cartItems");
        sessionStorage.removeItem("shippingAddress");
        sessionStorage.removeItem("orderInfo");
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

export const getOrderHistory = createAsyncThunk(
  "order/history",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/order/history",
        data: { userId: userInfo._id },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

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
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrderHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.history = action.payload;
    });
    builder.addCase(getOrderHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
