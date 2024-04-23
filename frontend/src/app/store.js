import { configureStore } from '@reduxjs/toolkit';
import userReducers from "../features/Auth/authSlice"
import blogReducers from "../features/Blog/blogSlice"
export const store = configureStore({
  reducer: {
    auth:userReducers,
    blog:blogReducers
  },
});
