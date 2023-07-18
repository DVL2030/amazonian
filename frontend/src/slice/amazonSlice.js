import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getHomePage = createAsyncThunk(
  "amazon/home",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get("/api/amazon/home");
      localStorage.setItem("amazonHome", JSON.stringify(res.data));
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

export const getProductList = createAsyncThunk(
  "amazon/products",
  async (searchParams, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/amazon/products", searchParams);
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

export const getProductAsin = createAsyncThunk(
  "amazon/productAsin",
  async (asin, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/amazon/productAsin", { asin: asin });

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

export const getProductReviews = createAsyncThunk(
  "amazon/productReviews",
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/amazon/reviews", params);
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

export const getReviewID = createAsyncThunk(
  "amazon/reviewID",
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/amazon/reviewID", params);
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

const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHomePage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.amazonHome = action.payload;
    });
    builder.addCase(getHomePage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductAsin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductAsin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.amazonProductAsin = action.payload;
    });
    builder.addCase(getProductAsin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.amazonReviews = action.payload;
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getReviewID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviewID.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.amazonReviewID = action.payload;
    });
    builder.addCase(getReviewID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default amazonSlice.reducer;
