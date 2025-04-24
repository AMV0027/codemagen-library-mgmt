import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedBooks: [],
};

const LikedBooksReducer = createSlice({
  name: "likedBooks",
  initialState: {
    likedBooks: [],
  },
  reducers: {
    loadLikedBooks: (state, action) => {
      state.likedBooks = action.payload;
    },
    addLikedBook: (state, action) => {
      try {
        if (!state.likedBooks.some((book) => book._id === action.payload._id)) {
          state.likedBooks.push(action.payload);
          localStorage.setItem("likedBooks", JSON.stringify(state.likedBooks));
        }
      } catch (err) {
        console.log(`error adding liked book: ${err}`);
      }
    },
    removeLikedBook: (state, action) => {
      try {
        const newLikedBooks = state.likedBooks.filter(
          (item) => item._id !== action.payload
        );
        state.likedBooks = newLikedBooks;
        localStorage.setItem("likedBooks", JSON.stringify(state.likedBooks));
      } catch (error) {
        console.log(`error removing liked book: ${error}`);
      }
    },
  },
});

export const { loadLikedBooks, addLikedBook, removeLikedBook } =
  LikedBooksReducer.actions;

export default LikedBooksReducer.reducer;
