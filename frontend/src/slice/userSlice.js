import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  address: null,
  favourite: null,
  loading: false,
  error: null,
  success: false,
};

export const getAddress = createAsyncThunk(
  "user/getAddress",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/users/getAddress",
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

export const saveAddress = createAsyncThunk(
  "user/saveAddress",
  async (address, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    const body = { userId: userInfo._id, ...address };
    try {
      const res = await Axios({
        method: "post",
        url: "/api/users/saveAddress",
        data: body,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.address = action.payload;
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(saveAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveAddress.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(saveAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
