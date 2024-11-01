import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import analyticsReducer from "../slices/analyticsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    analytics: analyticsReducer,
  },
});

export default store;
