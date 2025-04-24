import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './LoaderReducer';
import likedBooksReducer from './LikedBooksReducer';
import searchReducer from './SearchReducer';
import pageNumberReducer from './PageNumberReducer';
import createBookReducer from './CreateBookReducer';

export const store = configureStore({
    reducer: {
        loaderReducer: loaderReducer,
        likedBooksReducer: likedBooksReducer,
        searchReducer: searchReducer,
        pageNumberReducer: pageNumberReducer,
        createBookReducer: createBookReducer
    },
});
