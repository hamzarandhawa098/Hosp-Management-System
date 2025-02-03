import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../redux/profileSlice";
import authReducer from "../redux/authSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});
