import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsThunk } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
  favorites: [],
};

const carsSlice = createSlice({
  name: "cars",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsThunk.pending, handlePending)
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCarsThunk.rejected, handleRejected);
  },
});

export const carsReducer = carsSlice.reducer;
