import { AuthAPI } from "@/features/auth/authApi";
import { categoryAPI } from "@/features/category/categoryAPI";
import { productAPI } from "@/features/product/productAPI";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({ serializableCheck: false }).concat(
    getDefaultMiddleware()
      .concat(AuthAPI.middleware)
      .concat(productAPI.middleware)
      .concat(categoryAPI.middleware)
});
