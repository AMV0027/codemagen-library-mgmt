// loaderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LoaderReducer = createSlice({
  name: "loader",
  initialState: {
    books: null,
  },
  reducers: {
    loadBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});
export const { loadBooks } = LoaderReducer.actions;
export default LoaderReducer.reducer;
