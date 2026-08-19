import { baseApi } from "@/redux/api/baseApi";
import { CreateShippingAddressRequest, ShippingAddress, UpdateShippingAddressRequest } from "./types";


const toolsShippingApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* =========================
           GET ALL SHIPPING ADDRESSES
           GET /api/v1/tools/shipping-address/
        ========================= */

        getShippingAddresses: builder.query<ShippingAddress[], void>({
            query: () => ({
                url: "api/v1/tools/shipping-address/",
                method: "GET",
            }),
            providesTags: ["ShippingAddress"],
        }),

        /* =========================
           GET SINGLE SHIPPING ADDRESS
           GET /api/v1/tools/shipping-address/{id}/
        ========================= */

        getShippingAddressById: builder.query<
            ShippingAddress,
            number
        >({
            query: (id) => ({
                url: `api/v1/tools/shipping-address/${id}/`,
                method: "GET",
            }),
            providesTags: ["ShippingAddress"],
        }),

        /* =========================
           CREATE SHIPPING ADDRESS
           POST /api/v1/tools/shipping-address/
        ========================= */

        createShippingAddress: builder.mutation<
            ShippingAddress,
            CreateShippingAddressRequest
        >({
            query: (shippingInfo) => ({
                url: "api/v1/tools/shipping-address/",
                method: "POST",
                body: shippingInfo,
            }),
            invalidatesTags: ["ShippingAddress"],
        }),

        /* =========================
           UPDATE SHIPPING ADDRESS
           PATCH /api/v1/tools/shipping-address/{id}/
        ========================= */

        updateShippingAddress: builder.mutation<
            ShippingAddress,
            {
                id: number;
                data: UpdateShippingAddressRequest;
            }
        >({
            query: ({ id, data }) => ({
                url: `api/v1/tools/shipping-address/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["ShippingAddress"],
        }),

        /* =========================
           DELETE SHIPPING ADDRESS
           DELETE /api/v1/tools/shipping-address/{id}/
        ========================= */

        deleteShippingAddress: builder.mutation<
            void,
            number
        >({
            query: (id) => ({
                url: `api/v1/tools/shipping-address/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["ShippingAddress"],
        }),
    }),
});

/* =========================
   Export Hooks
========================= */

export const {
    useGetShippingAddressesQuery,
    useGetShippingAddressByIdQuery,
    useCreateShippingAddressMutation,
    useUpdateShippingAddressMutation,
    useDeleteShippingAddressMutation,
} = toolsShippingApis;