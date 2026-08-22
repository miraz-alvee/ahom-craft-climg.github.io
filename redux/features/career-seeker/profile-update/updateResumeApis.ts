import { baseApi } from "@/redux/api/baseApi";
import { ResumeResponse } from "./types";

const updateResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    // api/v1/service/career-seeker/profile/update/resume/
    getCareerSeekerResume: builder.query<ResumeResponse, void>({
      query: () => ({
        url: "api/v1/service/career-seeker/profile/update/resume/",
        method: "GET",
      }),
    }),

    // // PUT
    // // api/v1/service/career-seeker/profile/update/resume/
    // updateCareerSeekerResume: builder.mutation< ResumeResponse, FormData >({
    //   query: (data) => ({
    //     url: "api/v1/service/career-seeker/profile/update/resume/",
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

    // PATCH
    // api/v1/service/career-seeker/profile/update/resume/
    patchCareerSeekerResume: builder.mutation< ResumeResponse, FormData >({
      query: (data) => ({
        url: "api/v1/service/career-seeker/profile/update/resume/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCareerSeekerResumeQuery,
//   useUpdateCareerSeekerResumeMutation,
  usePatchCareerSeekerResumeMutation,
} = updateResumeApi;