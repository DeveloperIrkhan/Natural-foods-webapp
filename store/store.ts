import { configureStore } from "@reduxjs/toolkit";
import { AuthAPI } from "@/features/auth/authApi";
import { categoryAPI } from "@/features/category/categoryAPI";
import { productAPI } from "@/features/product/productAPI";
import { BlogAPI } from "@/features/blogs/BlogAPI";
import { orderAPI } from "@/features/Order/OrderAPI";
export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [BlogAPI.reducerPath]: BlogAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(AuthAPI.middleware)
      .concat(productAPI.middleware)
      .concat(categoryAPI.middleware)
      .concat(BlogAPI.middleware)
      .concat(orderAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
