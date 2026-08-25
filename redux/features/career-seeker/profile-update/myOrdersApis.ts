
import { baseApi } from "@/redux/api/baseApi";

import { OrdersResponse, Order } from "./types";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all orders
    // api/v1/service/career-seeker/profile/my-orders/
    getOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "api/v1/service/career-seeker/profile/my-orders/",
        method: "GET",
      }),
    }),

    // api/v1/service/career-seeker/profile/my-orders/18/
    getOrderById: builder.query<Order, number>({
      query: (id) => ({
        url: `api/v1/service/career-seeker/profile/my-orders/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi;

