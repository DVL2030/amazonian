import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  dashboard: null,
  order: null,
  user: null,
  review: null,
  product: null,
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

export const getAdminOrderOverView = createAsyncThunk(
  "admin/getAdminOrderOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/order",
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

export const getAdminUserOverView = createAsyncThunk(
  "admin/getAdminUserOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/user",
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

export const getAdminProductOverView = createAsyncThunk(
  "admin/getAdminProductOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/product",
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

export const getAdminReviewOverView = createAsyncThunk(
  "admin/getAdminReviewOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/review",
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
    builder.addCase(getAdminOrderOverView.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminOrderOverView.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    });
    builder.addCase(getAdminOrderOverView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminUserOverView.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminUserOverView.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(getAdminUserOverView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminProductOverView.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminProductOverView.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    });
    builder.addCase(getAdminProductOverView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminReviewOverView.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminReviewOverView.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.review = action.payload;
    });
    builder.addCase(getAdminReviewOverView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
