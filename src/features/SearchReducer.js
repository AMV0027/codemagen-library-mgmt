import { createSlice } from "@reduxjs/toolkit";

export const SearchReducer = createSlice({
    name: "search",
    initialState: {
        search: "",
        category: '',
        year: ''
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setFilter: (state, action) => {
            state.category = action.payload.category;
            state.year = action.payload.year;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        }
    }
})

export const { setSearch, setFilter, setCategory, setYear } = SearchReducer.actions

export default SearchReducer.reducer
