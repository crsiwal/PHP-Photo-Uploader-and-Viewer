import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./Slices/searchSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
  },
});
