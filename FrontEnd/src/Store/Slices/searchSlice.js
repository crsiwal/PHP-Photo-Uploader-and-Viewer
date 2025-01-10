import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
    page: 0,
  },
  reducers: {
    search: (state, action) => {
      state.searchText = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { search, setPage } = searchSlice.actions;
export default searchSlice.reducer;
