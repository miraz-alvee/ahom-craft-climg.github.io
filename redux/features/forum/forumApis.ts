
import { baseApi } from "@/redux/api/baseApi";
import { CreateForumRequest, Forum, UpdateForumRequest } from "./forumTypes";


const forumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET /api/v1/forum/
    getForums: builder.query<Forum[], void>({
      query: () => ({
        url: "api/v1/forum/",
        method: "GET",
      }),
    }),

    // POST /api/v1/forum/
    createForum: builder.mutation<Forum, CreateForumRequest>({
      query: (forumData) => ({
        url: "api/v1/forum/",
        method: "POST",
        body: forumData,
      }),
    }),

    // GET /api/v1/forum/{id}/
    getForumById: builder.query<Forum, number>({
      query: (id) => ({
        url: `api/v1/forum/${id}/`,
        method: "GET",
      }),
    }),

    // PATCH /api/v1/forum/{id}/
    updateForum: builder.mutation<Forum, UpdateForumRequest>({
      query: ({ id, data }) => ({
        url: `api/v1/forum/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),

    // DELETE /api/v1/forum/{id}/
    deleteForum: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/v1/forum/${id}/`,
        method: "DELETE",
      }),
    }),

    // GET /api/v1/forum/user-by/
    getForumsByUser: builder.query<Forum[], void>({
      query: () => ({
        url: "api/v1/forum/user-by/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetForumsQuery,
  useCreateForumMutation,
  useGetForumByIdQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useGetForumsByUserQuery,
} = forumApi;