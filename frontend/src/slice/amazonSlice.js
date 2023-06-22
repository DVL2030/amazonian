import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

// All async func definition

export const getHomePage = createAsyncThunk(
  "amazon/home",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get("/api/amazon/home");
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
      state.data = action.payload;
    });
    builder.addCase(getHomePage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default amazonSlice.reducer;
