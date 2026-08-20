import { baseApi } from "@/redux/api/baseApi";
import {
  CreateApplicationRequest,
  CreateApplicationResponse,
  JobApplicationList,
} from "./types";

const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/service/trainer/jobs/apply/  -> returns a plain array, not paginated
    getMyApplications: builder.query<JobApplicationList, void>({
      query: () => ({
        url: "api/v1/service/trainer/jobs/apply/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((app) => ({
                type: "Application" as const,
                id: app.application_id,
              })),
              { type: "Application" as const, id: "LIST" },
            ]
          : [{ type: "Application" as const, id: "LIST" }],
    }),

    // POST /api/v1/service/trainer/jobs/apply/  -> apply to a job
    applyToJob: builder.mutation<CreateApplicationResponse, CreateApplicationRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("job", String(data.job));
        if (data.resume) formData.append("resume", data.resume);
        if (data.expected_salary) formData.append("expected_salary", data.expected_salary);
        if (data.score !== undefined) formData.append("score", String(data.score));

        return {
          url: "api/v1/service/trainer/jobs/apply/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),
  }),
});

export const { useGetMyApplicationsQuery, useApplyToJobMutation } = applicationsApi;