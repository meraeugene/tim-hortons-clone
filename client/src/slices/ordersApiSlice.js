import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${ORDERS_URL}/myorders`,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["MyOrders"],

      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: ORDERS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Orders"],
      keepUnusedDataFor: 5,
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.orderId}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateCodOrderToPaid: builder.mutation({
      query: ({ orderId }) => ({
        url: `${ORDERS_URL}/${orderId}/cod/pay`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateCodOrderToPaidMutation,
} = ordersApiSlice;
