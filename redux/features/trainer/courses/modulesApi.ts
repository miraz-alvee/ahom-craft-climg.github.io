import { baseApi } from "@/redux/api/baseApi";

export interface Module {
    id: number;
    user: number | string;
    title: string;
    description: string;
    thumbnail: string;
    price: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ModuleMutationResponse {
    message: string;
    Module: Module;
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
                url: "api/v1/service/trainer/Modules/",
                method: "GET",
            }),
        }),

        getSingleModule: builder.query<Module, number | string>({
            query: (ModuleId) => ({
                url: `api/v1/service/trainer/Modules/${ModuleId}/`,
                method: "GET",
            }),
        }),

        createModule: builder.mutation<ModuleMutationResponse, FormData>({
            query: (formData) => ({
                url: "api/v1/service/trainer/Modules/",
                method: "POST",
                body: formData,
            }),
        }),

        updateModule: builder.mutation<ModuleMutationResponse, UpdateModulePayload>({
            query: ({ formData, ModuleId }) => ({
                url: `api/v1/service/trainer/Modules/${ModuleId}/`,
                method: "PATCH",
                body: formData,
            }),
        }),

        deleteModule: builder.mutation<DeleteModuleResponse, number | string>({
            query: (ModuleId) => ({
                url: `api/v1/service/trainer/Modules/${ModuleId}/`,
                method: "DELETE",
            }),
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