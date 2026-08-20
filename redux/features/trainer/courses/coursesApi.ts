import { baseApi } from "@/redux/api/baseApi";

export interface Course {
    id: number;
    user: number;
    title: string;
    description: string;
    thumbnail: string;
    price: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

const courseListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseList: builder.query<Course[], void>({
            query: () => ({
                url: "api/v1/service/trainer/courses/",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetCourseListQuery } = courseListApi;