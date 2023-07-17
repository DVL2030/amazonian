import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  success: false,
  favProducts: [],
  favReviews: [],
  loading: false,
  error: null,
};

export const addItemToFavourite = createAsyncThunk(
  "favourite/addItemToFavourite",
  async (param, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const { item, type } = param;
      const res = await Axios({
        method: "post",
        url: "/api/favourite/add",
        data: { userId: userInfo._id, item: item, type: type },
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

export const removeItemFromFavourite = createAsyncThunk(
  "favourite/removeItemFromFavourite",
  async (id, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/remove",
        data: { userId: userInfo._id, id: id },
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

export const getFavourites = createAsyncThunk(
  "favourite/getFavourites",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getAll",
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

export const getFavouriteProducts = createAsyncThunk(
  "favourite/getFavouriteProducts",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getProducts",
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

export const getFavouriteReviews = createAsyncThunk(
  "favourite/getFavouriteReviews",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    const body = { userId: userInfo._id };
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getReviews",
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

const favouriteSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItemToFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addItemToFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload;
    });
    builder.addCase(addItemToFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default favouriteSlice.reducer;
