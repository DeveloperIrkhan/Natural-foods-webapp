import { ICategoryModel } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface categoryResponse {
  categories: ICategoryModel[];
}

export const categoryAPI = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    getCategory: builder.query<categoryResponse, void>({
      query: () => ({
        url: "/category",
        method: "GET"
      })
    })
  })
});

export const { useGetCategoryQuery } = categoryAPI;
