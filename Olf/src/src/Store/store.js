import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./Slices/searchSlice";
import authSlice from "./Slices/authSlice";
import { layoutSlice } from "./Slices/layout";

export default configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    layout: layoutSlice
  },
});
