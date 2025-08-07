import { IOrder } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (_builder) => ({
    postOrder: _builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData
      })
    }),
    getOrder: _builder.query({
      query: (email) => ({
        url: `/orders/orderbyemail/${email}`,
        method: "GET"
      })
    })
  })
});

export const { usePostOrderMutation, useGetOrderQuery } = orderAPI;
