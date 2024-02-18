import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllCars } from "../components/services/api";

axios.defaults.baseURL = "https://65cc9255dd519126b83eec3e.mockapi.io";

export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchCars",
  async (params, thunkAPI) => {
    try {
      const response = await fetchAllCars(params);
      return response;
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
