import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  dashboard: null,
  loading: false,
  error: null,
};

export const getDashboardOverview = createAsyncThunk(
  "admin/getDashboardOverview",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/dashboard",
        data: { user: userInfo },
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardOverview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDashboardOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.dashboard = action.payload;
    });
    builder.addCase(getDashboardOverview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
