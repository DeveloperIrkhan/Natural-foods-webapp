import { IProductModel } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductResponse {
  products: IProductModel[];
}

export const productAPI = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (_builder) => ({
    getProduct: _builder.query<ProductResponse, void>({
      query: () => ({
        url: "/product",
        method: "GET"
      })
    })
  })
});

export const { useGetProductQuery } = productAPI;
