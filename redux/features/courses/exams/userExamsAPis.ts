import { baseApi } from "@/redux/api/baseApi";
import { ExamAttemptResponse, ExamResultDetails, ExamResultSummaryResponse, GetExamResultDetailsPayload, SubmitExamAnswerPayload, SubmitExamAnswerResponse } from "./examsTypes";


const userExamsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getExamById: builder.query<ExamAttemptResponse, number>({
            query: (id) => ({
                url: `api/v1/service/user-exams/questions/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Exam", id }],
        }),

        submitExamAnswer: builder.mutation<SubmitExamAnswerResponse, SubmitExamAnswerPayload>({
            query: (body) => ({
                url: "api/v1/service/user-exams/",
                method: "POST",
                body,
            }),
        }),

        getExamResultDetails: builder.query<ExamResultDetails[], GetExamResultDetailsPayload>({
            query: ({ module_id, attempt_id }) => ({
                url: `api/v1/service/user-exam/results/${module_id}/${attempt_id}/`,
                method: "GET",
            }),
            providesTags: (result, error, { module_id, attempt_id }) => [
                {
                    type: "Exam",
                    id: `${module_id}-${attempt_id}`,
                },
            ],
        }),

        getExamResultSummary: builder.query<ExamResultSummaryResponse, number>({
            query: (module_id) => ({
                url: `api/v1/service/user-exam/results/summary/${module_id}/`,
                method: "GET",
            }),
            providesTags: (result, error, module_id) => [
                {
                    type: "Exam",
                    id: `summary-${module_id}`,
                },
            ],
        }),

    }),
});

export const {
    useGetExamByIdQuery,
    useSubmitExamAnswerMutation,
    useGetExamResultDetailsQuery,
    useGetExamResultSummaryQuery,

} = userExamsApi;