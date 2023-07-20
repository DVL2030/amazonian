import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  product: null,
  succees: false,
  loading: false,
  error: null,
};

export const getAsinFromDB = createAsyncThunk(
  "product/getAsin",
  async (asin, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/product/getAsin", { asin: asin });

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

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/product/save", { product: product });
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAsinFromDB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAsinFromDB.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    });
    builder.addCase(getAsinFromDB.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.succees = action.payload;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
