import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const userInfo = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;

const initialState = {
  userInfo,
  loading: false,
  error: null,
};

// All async func definition

export const signin = createAsyncThunk(
  "user/signin",
  async (authParams, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/users/signin", authParams);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
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

export const signout = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    try {
      const wait = (delay) =>
        new Promise((resolve, reject) => setTimeout(resolve, delay));
      await wait(1000);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // signout(state) {
    //   state.userInfo = null;
    //   localStorage.removeItem("userInfo");
    //   localStorage.removeItem("cartItems");
    //   localStorage.removeItem("shippingAddress");
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userAuthSlice.reducer;
