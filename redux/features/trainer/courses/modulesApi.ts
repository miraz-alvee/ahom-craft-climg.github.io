import { baseApi } from "@/redux/api/baseApi";

export interface Module {
    id: number;
    course: number | string;
    title: string;
    description: string;
    thumbnail: string;
    number_questions_every_exam: number;
    number_exam_attempts: number;
    is_free: boolean;
    is_active: boolean;
    is_exam_complete: boolean;
    warning: string[];
    created_at: string;
    updated_at: string;
}

export interface ModuleMutationResponse {
    message: string;
    module: Module;
}

export interface DeleteModuleResponse {
    message: string;
}

export interface UpdateModulePayload {
    formData: FormData;
    ModuleId: number | string;
}

const ModulesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getModuleList: builder.query<Module[], void>({
            query: () => ({
                url: "api/v1/service/trainer/modules/",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Module" as const, id })),
                        { type: "Module" as const, id: "LIST" },
                    ]
                    : [{ type: "Module" as const, id: "LIST" }],
        }),

        getSingleModule: builder.query<Module, number | string>({
            query: (ModuleId) => ({
                url: `api/v1/service/trainer/modules/${ModuleId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, ModuleId) => [
                { type: "Module" as const, id: ModuleId },
            ],
        }),

        createModule: builder.mutation<ModuleMutationResponse, FormData>({
            query: (formData) => ({
                url: "api/v1/service/trainer/modules/",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Module" as const, id: "LIST" }],
        }),

        updateModule: builder.mutation<ModuleMutationResponse, UpdateModulePayload>({
            query: ({ formData, ModuleId }) => ({
                url: `api/v1/service/trainer/modules/${ModuleId}/`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (_result, _error, { ModuleId }) => [
                { type: "Module" as const, id: ModuleId },
                { type: "Module" as const, id: "LIST" },
            ],
        }),

        deleteModule: builder.mutation<DeleteModuleResponse, number | string>({
            query: (ModuleId) => ({
                url: `api/v1/service/trainer/modules/${ModuleId}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, ModuleId) => [
                { type: "Module" as const, id: ModuleId },
                { type: "Module" as const, id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetModuleListQuery,
    useGetSingleModuleQuery,
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
} = ModulesApi;