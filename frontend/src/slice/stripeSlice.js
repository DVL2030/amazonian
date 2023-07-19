import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  key: null,
  secret: null,
  loading: false,
  error: null,
};

export const getStripeKey = createAsyncThunk(
  "stripe/getKey",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "get",
        url: "/api/stripe/getKey",
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
export const createIntent = createAsyncThunk(
  "stripe/create",
  async (param, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/stripe/create",
        data: param,
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

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStripeKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStripeKey.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.key = action.payload;
    });
    builder.addCase(getStripeKey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createIntent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createIntent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.secret = action.payload;
    });
    builder.addCase(createIntent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default stripeSlice.reducer;
