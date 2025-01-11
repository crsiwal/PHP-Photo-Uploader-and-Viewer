import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import searchReducer from "./features/search/searchSlice";
import layoutReducer from "./features/layout/layout";

export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    layout: layoutReducer,
  },
});
