import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("_t"),
    uid: localStorage.getItem("_i") || null,
    token: localStorage.getItem("_t") || null,
    permissions: localStorage.getItem("_p") !== "undefined" ? JSON.parse(localStorage.getItem("_p")) : [] || [],
    user: localStorage.getItem("_u") !== "undefined" ? JSON.parse(localStorage.getItem("_u")) : [] || [],
  },
  reducers: {
    login: (state, action) => {
      if (action.payload.id) {
        state.isAuthenticated = true;
        state.uid = action.payload.id;
        state.token = action.payload.token;
        state.permissions = action.payload?.permissions || [];
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          picture: action.payload.picture,
        };
        localStorage.setItem("_i", state.uid);
        localStorage.setItem("_t", state.token);
        localStorage.setItem("_u", JSON.stringify(state.user));
        localStorage.setItem("_p", JSON.stringify(state.permissions));
      }
    },
    setPermissions: (state, action) => {
      if (action.payload.id) {
        if (state.uid === action.payload.id) {
          state.permissions = action.payload?.permissions || [];
          localStorage.setItem("_p", JSON.stringify(state.permissions));
        }
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.uid = null;
      state.token = null;
      state.user = null;
      state.permissions = [];
      localStorage.removeItem("_i");
      localStorage.removeItem("_t");
      localStorage.removeItem("_u");
      localStorage.removeItem("_p");
    },
  },
});

export const { login, setPermissions, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector to get the login authentications
export const loginAuth = state => state.auth;
