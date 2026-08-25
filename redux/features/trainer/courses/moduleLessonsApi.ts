import { baseApi } from "@/redux/api/baseApi";

export interface Lesson {
    id: number;
    module: number | string;
    title: string;
    description: string;
    video: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface LessonMutationResponse {
    message: string;
    lesson: Lesson;
}

export interface DeleteLessonResponse {
    message: string;
}

export interface UpdateLessonPayload {
    formData: FormData;
    LessonId: number | string;
}

const LessonsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLessonList: builder.query<Lesson[], void>({
            query: () => ({
                url: "api/v1/service/trainer/lessons/",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Lesson" as const, id })),
                        { type: "Lesson" as const, id: "LIST" },
                    ]
                    : [{ type: "Lesson" as const, id: "LIST" }],
        }),

        getSingleLesson: builder.query<Lesson, number | string>({
            query: (LessonId) => ({
                url: `api/v1/service/trainer/lessons/${LessonId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, LessonId) => [
                { type: "Lesson" as const, id: LessonId },
            ],
        }),

        createLesson: builder.mutation<LessonMutationResponse, FormData>({
            query: (formData) => ({
                url: "api/v1/service/trainer/lessons/",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Lesson" as const, id: "LIST" }],
        }),

        updateLesson: builder.mutation<LessonMutationResponse, UpdateLessonPayload>({
            query: ({ formData, LessonId }) => ({
                url: `api/v1/service/trainer/lessons/${LessonId}/`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (_result, _error, { LessonId }) => [
                { type: "Lesson" as const, id: LessonId },
                { type: "Lesson" as const, id: "LIST" },
            ],
        }),

        deleteLesson: builder.mutation<DeleteLessonResponse, number | string>({
            query: (LessonId) => ({
                url: `api/v1/service/trainer/lessons/${LessonId}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, LessonId) => [
                { type: "Lesson" as const, id: LessonId },
                { type: "Lesson" as const, id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetLessonListQuery,
    useGetSingleLessonQuery,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = LessonsApi;