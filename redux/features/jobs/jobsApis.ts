import { baseApi } from "@/redux/api/baseApi";
import {
    CreateJobRequest,
    CreateJobResponse,
    GetJobsParams,
    Job,
    PaginatedJobResponse,
    UpdateJobRequest,
} from "./types";

const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<PaginatedJobResponse, GetJobsParams | void>({
            query: (params) => ({
                url: "api/v1/service/jobs/",
                method: "GET",
                params: params ?? undefined,
            }),
            // Normalizes the response in case the backend returns a plain array
            // instead of DRF's paginated { count, next, previous, results } shape.
            transformResponse: (response: PaginatedJobResponse | Job[]): PaginatedJobResponse => {
                if (Array.isArray(response)) {
                    return { count: response.length, next: null, previous: null, results: response };
                }
                return response;
            },
            providesTags: (result) =>
                result?.results
                    ? [
                        ...result.results.map((job) => ({ type: "Job" as const, id: job.id })),
                        { type: "Job" as const, id: "LIST" },
                    ]
                    : [{ type: "Job" as const, id: "LIST" }],
        }),

        getJobById: builder.query<Job, number>({
            query: (id) => ({
                url: `api/v1/service/jobs/${id}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Job", id }],
        }),

        createJob: builder.mutation<CreateJobResponse, CreateJobRequest>({
            query: (jobData) => ({
                url: "api/v1/service/jobs/",
                method: "POST",
                body: jobData,
            }),
            invalidatesTags: [{ type: "Job", id: "LIST" }],
        }),

        updateJob: builder.mutation<CreateJobResponse, { id: number; data: UpdateJobRequest }>({
            query: ({ id, data }) => ({
                url: `api/v1/service/jobs/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Job", id },
                { type: "Job", id: "LIST" },
            ],
        }),

        patchJob: builder.mutation<CreateJobResponse, { id: number; data: Partial<UpdateJobRequest> }>({
            query: ({ id, data }) => ({
                url: `api/v1/service/jobs/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Job", id },
                { type: "Job", id: "LIST" },
            ],
        }),

        deleteJob: builder.mutation<void, number>({
            query: (id) => ({
                url: `api/v1/service/jobs/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Job", id },
                { type: "Job", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    usePatchJobMutation,
    useDeleteJobMutation,
} = jobsApi;