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
      console.log(error.response.data.message);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const userSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signout() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
    },
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
  },
});

export const { signout } = userSlice.actions;

export default userSlice.reducer;
