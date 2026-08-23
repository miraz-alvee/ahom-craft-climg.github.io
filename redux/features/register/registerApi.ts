import { baseApi } from "@/redux/api/baseApi";

export interface RegisterRequest {
    email: string;
    full_name: string;
    user_role: string;
    password: string;
    confirm_password: string;
}

export interface RegisterResponse {
    message: string;
    user_details: string;
}

export interface ActivateRequest {
    email: string;
    code: string;
}

export interface ActivateResponse {
    message: string;
}

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userInfo) => ({
                url: "api/v1/auth/register/",
                method: "POST",
                body: userInfo,
            }),
        }),
        activate: builder.mutation<ActivateResponse, ActivateRequest>({
            query: (payload) => ({
                url: "api/v1/auth/register/activate/",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivateMutation } = authApi;