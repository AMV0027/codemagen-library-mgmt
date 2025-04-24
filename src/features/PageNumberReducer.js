import { createSlice } from "@reduxjs/toolkit";

export const PageNumberReducer = createSlice({
  name: "pageNumber",
  initialState: {
    currentPageNumber: 1,
    booksPerPage: 12,
    indexOfLastBook: 10,
    indexOfFirstBook: 0,
  },
  reducers: {
    nextPage: (state) => {
      state.currentPageNumber += 1;
      state.indexOfLastBook = state.currentPageNumber * state.booksPerPage;
      state.indexOfFirstBook = state.indexOfLastBook - state.booksPerPage;
    },
    beforePage: (state) => {
      if (state.currentPageNumber > 1) {
        state.currentPageNumber -= 1;
        state.indexOfLastBook = state.currentPageNumber * state.booksPerPage;
        state.indexOfFirstBook = state.indexOfLastBook - state.booksPerPage;
      }
    },
    resetPage: (state) => {
      state.currentPageNumber = 1;
      state.indexOfLastBook = state.currentPageNumber * state.booksPerPage;
      state.indexOfFirstBook = state.indexOfLastBook - state.booksPerPage;
    },
  },
});

export const { nextPage, beforePage, resetPage } = PageNumberReducer.actions;

export default PageNumberReducer.reducer;
