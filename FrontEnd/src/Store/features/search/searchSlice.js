import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: {},
    page: 1
  },
  reducers: {
    addFilter: (state, action) => {
      if (action.payload.key !== "") {
        if (action.payload.value !== "") {
          const tmpStore = { ...state.filters, [action.payload.key]: action.payload.value };
          state.filters = tmpStore;
        } else {
          if (state.filters.hasOwnProperty(action.payload.key)) {
            const { [action.payload.key]: _, ...remainingFilters } = state.filters;
            state.filters = remainingFilters;
          }
        }
      }
    },
    removeFilter: (state, action) => {
      if (state.filters.hasOwnProperty(action.payload)) {
        const { [action.payload]: _, ...remainingFilters } = state.filters;
        state.filters = remainingFilters;
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { addFilter, removeFilter, setPage } = searchSlice.actions;
export default searchSlice.reducer;
