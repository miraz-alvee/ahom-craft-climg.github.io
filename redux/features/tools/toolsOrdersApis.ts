import { baseApi } from "@/redux/api/baseApi";
import { ToolOrder, CreateOrderRequest } from "./types";


const toolsOrdersApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* =========================
           GET ALL ORDERS
           GET /api/v1/tools/orders/
        ========================= */

        getOrders: builder.query<ToolOrder[], void>({
            query: () => ({
                url: "api/v1/tools/orders/",
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),

        /* =========================
           CREATE ORDER
           POST /api/v1/tools/orders/
        ========================= */

        createOrder: builder.mutation<
            ToolOrder,
            CreateOrderRequest
        >({
            query: (orderInfo) => ({
                url: "api/v1/tools/orders/",
                method: "POST",
                body: orderInfo,
            }),
            invalidatesTags: ["Orders", "Cart"],
        }),

        /* =========================
           GET SINGLE ORDER
           GET /api/v1/tools/orders/{id}/
        ========================= */

        getOrderById: builder.query<
            ToolOrder,
            number
        >({
            query: (id) => ({
                url: `api/v1/tools/orders/${id}/`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),

        /* =========================
           GET ORDER DASHBOARD
           GET /api/v1/tools/orders/dashboard/
        ========================= */

        getOrdersDashboard: builder.query<
            ToolOrder[],
            void
        >({
            query: () => ({
                url: "api/v1/tools/orders/dashboard/",
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
    }),
});

/* =========================
   Export Hooks
========================= */

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersDashboardQuery,
} = toolsOrdersApis;