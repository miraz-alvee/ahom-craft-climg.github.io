
import { baseApi } from "@/redux/api/baseApi";
import { CreateRoleCahgeRequestPayload, RoleCahgeRequestResponse } from "./types";

const roleChangeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST api/v1/auth/role-change-requests/
        createRequestPost: builder.mutation< RoleCahgeRequestResponse, CreateRoleCahgeRequestPayload >({
            query: (forumData) => ({
                url: "api/v1/auth/role-change-requests/",
                method: "POST",
                body: forumData,
            }),
        }),
    }),
});

export const {
    useCreateRequestPostMutation,
} = roleChangeApi;