import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CreateBookReducer = createSlice({
  name: "createBook",
  initialState: {
    mybooks: [],
    selectedBook: null,
  },
  reducers: {
    loadMyBooks: (state, action) => {
      state.mybooks = action.payload;
    },
    addMyBook: (state, action) => {
      state.mybooks.push(action.payload);
      localStorage.setItem("mybooks", JSON.stringify(state.mybooks));
    },
    removeMyBook: (state, action) => {
      state.mybooks = state.mybooks.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("mybooks", JSON.stringify(state.mybooks));
    },
    updateMyBook: (state, action) => {
      const index = state.mybooks.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.mybooks[index] = action.payload;
        localStorage.setItem("mybooks", JSON.stringify(state.mybooks));
      }
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const {
  loadMyBooks,
  addMyBook,
  removeMyBook,
  updateMyBook,
  setSelectedBook,
  clearSelectedBook,
} = CreateBookReducer.actions;

export default CreateBookReducer.reducer;
