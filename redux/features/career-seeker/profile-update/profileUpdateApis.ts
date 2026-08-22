import { baseApi } from "@/redux/api/baseApi";
import { CareerSeekerProfile } from "./types";


const profileUpdateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    // api/v1/service/career-seeker/profile/update/
    getCareerSeekerProfile: builder.query<CareerSeekerProfile, void>({
      query: () => ({
        url: "api/v1/service/career-seeker/profile/update/",
        method: "GET",
      }),
    }),

    // // PUT
    // // api/v1/service/career-seeker/profile/update/
    // updateCareerSeekerProfile: builder.mutation<
    //   CareerSeekerProfile,
    //   CareerSeekerProfile
    // >({
    //   query: (data) => ({
    //     url: "api/v1/service/career-seeker/profile/update/",
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

    // PATCH
    // api/v1/service/career-seeker/profile/update/
    patchCareerSeekerProfile: builder.mutation< CareerSeekerProfile,Partial<CareerSeekerProfile> >({
      query: (data) => ({
        url: "api/v1/service/career-seeker/profile/update/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCareerSeekerProfileQuery,
// useUpdateCareerSeekerProfileMutation,
  usePatchCareerSeekerProfileMutation,
} = profileUpdateApi;