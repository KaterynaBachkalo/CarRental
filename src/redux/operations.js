import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65cc9255dd519126b83eec3e.mockapi.io";
const perPage = 12;

export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(
        `/adverts?page=${page}&limit=${perPage}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCarsThunk = createAsyncThunk(
  "cars/fetchAllCars",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/adverts`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
