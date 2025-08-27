import { IOrder } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IOrderResponse {
  orders: IOrder[];
}
export const orderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["Order"],
  endpoints: (_builder) => ({
    postOrder: _builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData
      }),
      invalidatesTags: ["Order"]
    }),
    getOrder: _builder.query({
      query: (email) => ({
        url: `/orders/orderbyemail/${email}`,
        method: "GET"
      }),
      providesTags: ["Order"]
    }),
    getAllOrders: _builder.query<IOrderResponse, void>({
      query: () => ({
        url: "/orders/get-all",
        method: "GET"
      }),
      providesTags: ["Order"]
    }),

    updatePaymentStatus: _builder.mutation({
      query: ({ orderId, paymentStatus }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: { paymentStatus }
      }),
      invalidatesTags: ["Order"]
    })
  })
});

export const {
  usePostOrderMutation,
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useUpdatePaymentStatusMutation
} = orderAPI;
