import { baseApi } from "@/redux/api/baseApi";

export interface Course {
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

export interface CourseMutationResponse {
    message: string;
    course: Course;
}

export interface DeleteCourseResponse {
    message: string;
}

export interface UpdateCoursePayload {
    formData: FormData;
    courseId: number | string;
}

const coursesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseList: builder.query<Course[], void>({
            query: () => ({
                url: "api/v1/service/trainer/courses/",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Course" as const, id })),
                        { type: "Course" as const, id: "LIST" },
                    ]
                    : [{ type: "Course" as const, id: "LIST" }],
        }),

        getSingleCourse: builder.query<Course, number | string>({
            query: (courseId) => ({
                url: `api/v1/service/trainer/courses/${courseId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, courseId) => [
                { type: "Course" as const, id: courseId },
            ],
        }),

        createCourse: builder.mutation<CourseMutationResponse, FormData>({
            query: (formData) => ({
                url: "api/v1/service/trainer/courses/",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Course" as const, id: "LIST" }],
        }),

        updateCourse: builder.mutation<CourseMutationResponse, UpdateCoursePayload>({
            query: ({ formData, courseId }) => ({
                url: `api/v1/service/trainer/courses/${courseId}/`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (_result, _error, { courseId }) => [
                { type: "Course" as const, id: courseId },
                { type: "Course" as const, id: "LIST" },
            ],
        }),

        deleteCourse: builder.mutation<DeleteCourseResponse, number | string>({
            query: (courseId) => ({
                url: `api/v1/service/trainer/courses/${courseId}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, courseId) => [
                { type: "Course" as const, id: courseId },
                { type: "Course" as const, id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetCourseListQuery,
    useGetSingleCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = coursesApi;