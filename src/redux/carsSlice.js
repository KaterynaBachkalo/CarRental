import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCarsThunk, fetchCarsThunk } from "./operations";
import { toast } from "react-toastify";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;

  if (state.error === "Request failed with status code 404") {
    toast.error("A car with these parameters was not found", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  if (state.error === "Network Error") {
    toast.error("Something went wrong, please try later", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
  favorites: [],
  loadMoreButton: true,
};

const carsSlice = createSlice({
  name: "cars",
  initialState: INITIAL_STATE,

  reducers: {
    addToFavorites: {
      reducer(state, action) {
        state.favorites.push(action.payload);
      },
    },
    deleteFavorites: {
      reducer(state, action) {
        state.favorites = state.favorites.filter(
          (favorite) => favorite !== action.payload
        );
      },
    },
    clearState: {
      reducer(state) {
        state.items = [];
      },
    },
    setloadMoreButton: {
      reducer(state, action) {
        state.loadMoreButton = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsThunk.pending, handlePending)
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.isLoading = false;
        state.error = null;
        state.loadMoreButton = true;
      })
      .addCase(fetchCarsThunk.rejected, handleRejected)

      .addCase(fetchAllCarsThunk.pending, handlePending)
      .addCase(fetchAllCarsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllCarsThunk.rejected, handleRejected);
  },
});

export const {
  addToFavorites,
  deleteFavorites,
  clearState,
  setloadMoreButton,
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
