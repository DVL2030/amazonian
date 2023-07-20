import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  favProducts: null,
  favAsins: null,
  favReviews: null,
  favReviewIds: null,
  loading: false,
  error: null,
};

export const addItemToFavourite = async (userInfo, item, type) => {
  try {
    const res = await Axios({
      method: "post",
      url: "/api/favourite/add",
      data: { userId: userInfo._id, item: item, type: type },
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    return res.data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw new Error(message);
  }
};

export const removeItemFromFavourite = async (userInfo, id, type) => {
  try {
    const res = await Axios({
      method: "post",
      url: "/api/favourite/remove",
      data: { userId: userInfo._id, id: id, type: type },
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    return res.data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw new Error(message);
  }
};

export const getFavouriteProductList = createAsyncThunk(
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

export const getFavouriteAsins = createAsyncThunk(
  "favourite/getFavouriteAsins",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getProductAsins",
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

export const getFavouriteReviewList = createAsyncThunk(
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
export const getFavouriteReviewIds = createAsyncThunk(
  "favourite/getFavouriteReviewIds",
  async (_, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    const body = { userId: userInfo._id };
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getReviewIds",
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
    builder.addCase(getFavouriteProductList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favProducts = action.payload;
    });
    builder.addCase(getFavouriteProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getFavouriteAsins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteAsins.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favAsins = action.payload;
    });
    builder.addCase(getFavouriteAsins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getFavouriteReviewList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteReviewList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favReviews = action.payload;
    });
    builder.addCase(getFavouriteReviewList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getFavouriteReviewIds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteReviewIds.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favReviewIds = action.payload;
    });
    builder.addCase(getFavouriteReviewIds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default favouriteSlice.reducer;
