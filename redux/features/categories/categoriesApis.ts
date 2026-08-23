import { baseApi } from "@/redux/api/baseApi";
import {
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
  PartialUpdateCategoryRequest,
  PatchCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "./types";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "api/v1/service/categories/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((c) => ({ type: "Category" as const, id: c.id })),
              { type: "Category" as const, id: "LIST" },
            ]
          : [{ type: "Category" as const, id: "LIST" }],
    }),

    getCategoryById: builder.query<Category, number>({
      query: (id) => ({
        url: `api/v1/service/categories/${id}/`,
        method: "GET",
      }),
      providesTags: (_r, _e, id) => [{ type: "Category", id }],
    }),

    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
      query: (body) => ({
        url: "api/v1/service/categories/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation<UpdateCategoryResponse, { id: number; data: UpdateCategoryRequest }>({
      query: ({ id, data }) => ({
        url: `api/v1/service/categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Category", id }, { type: "Category", id: "LIST" }],
    }),

    patchCategory: builder.mutation<PatchCategoryResponse, { id: number; data: PartialUpdateCategoryRequest }>({
      query: ({ id, data }) => ({
        url: `api/v1/service/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Category", id }, { type: "Category", id: "LIST" }],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/v1/service/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [{ type: "Category", id }, { type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  usePatchCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;