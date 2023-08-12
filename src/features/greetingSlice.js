import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  greetings: null,
  isLoading: false,
  error: null,
};
const BASE_URL = 'http://localhost:3000/api/';
export const fetchGreetings = createAsyncThunk('greetings/fetchGreetings', async () => {
  try {
    const response = await axios.get(`${BASE_URL}greetings`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch greetings.');
  }
});

const greetingsSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreetings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGreetings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGreetings.fulfilled, (state, action) => {
        state.greetings = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default greetingsSlice.reducer;
