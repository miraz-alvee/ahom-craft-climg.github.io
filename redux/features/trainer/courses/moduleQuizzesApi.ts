import { baseApi } from "@/redux/api/baseApi";

export interface Quizze {
    quiz_id: number;
    module: number | string;
    question: string;
    questions: QuizOption[];
    explanation: string;
    created_at: string;
    updated_at: string;
}

export interface QuizOption {
    id?: number;
    quiz?: string;
    option_text: string;
    is_correct: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface QuizzePayload {
    module?: number | string;
    question: string;
    explanation: string;
    questions: Array<Pick<QuizOption, "option_text" | "is_correct">>;
}

export interface QuizzeMutationResponse {
    message: string;
    quiz: Quizze;
}

export interface DeleteQuizzeResponse {
    message: string;
}

export interface UpdateQuizzePayload {
    body: QuizzePayload;
    QuizzeId: number | string;
}

const QuizzesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzeList: builder.query<Quizze[], void>({
            query: () => ({
                url: "api/v1/service/trainer/lessons/quizzes/",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ quiz_id }) => ({ type: "Quizze" as const, id: quiz_id })),
                        { type: "Quizze" as const, id: "LIST" },
                    ]
                    : [{ type: "Quizze" as const, id: "LIST" }],
        }),

        getSingleQuizze: builder.query<Quizze, number | string>({
            query: (QuizzeId) => ({
                url: `api/v1/service/trainer/lessons/quizzes/${QuizzeId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, QuizzeId) => [
                { type: "Quizze" as const, id: QuizzeId },
            ],
        }),

        createQuizze: builder.mutation<QuizzeMutationResponse, QuizzePayload>({
            query: (body) => ({
                url: "api/v1/service/trainer/lessons/quizzes/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Quizze" as const, id: "LIST" }],
        }),

        updateQuizze: builder.mutation<QuizzeMutationResponse, UpdateQuizzePayload>({
            query: ({ body, QuizzeId }) => ({
                url: `api/v1/service/trainer/lessons/quizzes/${QuizzeId}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_result, _error, { QuizzeId }) => [
                { type: "Quizze" as const, id: QuizzeId },
                { type: "Quizze" as const, id: "LIST" },
            ],
        }),

        deleteQuizze: builder.mutation<DeleteQuizzeResponse, number | string>({
            query: (QuizzeId) => ({
                url: `api/v1/service/trainer/lessons/quizzes/${QuizzeId}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, QuizzeId) => [
                { type: "Quizze" as const, id: QuizzeId },
                { type: "Quizze" as const, id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetQuizzeListQuery,
    useGetSingleQuizzeQuery,
    useCreateQuizzeMutation,
    useUpdateQuizzeMutation,
    useDeleteQuizzeMutation,
} = QuizzesApi;