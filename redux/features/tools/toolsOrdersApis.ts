import { baseApi } from "@/redux/api/baseApi";
import { ToolOrder, CreateOrderRequest } from "./types";

const toolsOrdersApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<ToolOrder[], void>({
            query: () => "api/v1/tools/orders/",
            providesTags: ["Orders"],
        }),

        createOrder: builder.mutation<ToolOrder, CreateOrderRequest>({
            query: (orderInfo) => ({
                url: "api/v1/tools/orders/",
                method: "POST",
                body: orderInfo,
            }),
            invalidatesTags: ["Orders", "Cart"],
        }),

        getOrderById: builder.query<ToolOrder, number>({
            query: (id) => `api/v1/tools/orders/${id}/`,
            providesTags: ["Orders"],
        }),

        getOrdersDashboard: builder.query<ToolOrder[], void>({
            query: () => "api/v1/tools/orders/dashboard/",
            providesTags: ["Orders"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersDashboardQuery,
} = toolsOrdersApis;