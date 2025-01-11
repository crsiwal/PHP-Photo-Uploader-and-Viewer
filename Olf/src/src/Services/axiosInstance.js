import axios from "axios";
import store from "../store/store";
import { loginAuth } from "../store/features/auth/authSlice";
import { API_BASE_URL, API_TIMEOUT } from "../config/config";

// Instance of axios with default configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Check user is logged in authenticated or not
    const userAuth = loginAuth(store.getState());
    // console.log(userAuth);

    if (userAuth.isAuthenticated) {
      // Attach token to headers if available
      if (userAuth.token) {
        config.headers.Authorization = `Bearer ${userAuth.token}`;
      }

      // Attach logged in User ID to headers if available
      if (userAuth.uid) {
        config.headers.uid = userAuth.uid;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    // Check if the error response exists
    if (error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      // For network errors or other errors without a response
      return Promise.reject(error); // Reject as usual
    }
  }
);

export default axiosInstance;
