import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  success: false,
  favProducts: [],
  favProduct: null,
  favReviews: [],
  favReview: null,
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
  async (param, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const { id, type } = param;
      const res = await Axios({
        method: "post",
        url: "/api/favourite/remove",
        data: { userId: userInfo._id, id: id, type: type },
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
export const getFavouriteProduct = createAsyncThunk(
  "favourite/getFavouriteProduct",
  async (id, { getState, rejectWithValue }) => {
    const {
      userAuth: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/favourite/getProduct",
        data: { userId: userInfo._id, productId: id },
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

export const getFavouriteReview = createAsyncThunk(
  "favourite/getFavouriteReview",
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
      state.success = action.payload.status;
    });
    builder.addCase(addItemToFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(removeItemFromFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeItemFromFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.status;
    });
    builder.addCase(removeItemFromFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
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
    builder.addCase(getFavouriteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favProduct = action.payload;
    });
    builder.addCase(getFavouriteProduct.rejected, (state, action) => {
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
    builder.addCase(getFavouriteReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.favReview = action.payload;
    });
    builder.addCase(getFavouriteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default favouriteSlice.reducer;
