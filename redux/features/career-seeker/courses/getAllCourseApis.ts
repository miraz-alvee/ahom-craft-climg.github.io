import { baseApi } from "@/redux/api/baseApi";
import { CourseListItem, CourseDetail } from "./courseTypes";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<CourseListItem[], void>({
      query: () => ({
        url: "api/v1/service/trainer/courses/all/",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<CourseDetail, number>({
      query: (id) => ({
        url: `api/v1/service/trainer/courses/details/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    purchaseCourse: builder.mutation< { course: number; payment_status: string },{ course: number; payment_status: string }>({
      query: (body) => ({
        url: "api/v1/service/course-purchase/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Course", id: arg.course },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCourseQuery,
  useGetCourseByIdQuery,
  usePurchaseCourseMutation,
} = courseApi;