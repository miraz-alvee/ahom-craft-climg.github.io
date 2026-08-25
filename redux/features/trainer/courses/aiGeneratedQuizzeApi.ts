import { baseApi } from "@/redux/api/baseApi";

export interface GeneratedQuizOption {
    text: string;
    is_correct: boolean;
}

export interface GeneratedQuizQuestion {
    question_number: number;
    topic: string;
    question: string;
    options: GeneratedQuizOption[];
    correct_answer: string;
    explanation: string;
}

export interface GenerateQuizzePayload {
    lesson_id: number | string;
    document_id?: number | string | null;
    number_questions: number;
}

export interface GenerateQuizzeResponse {
    message: string;
    task_id: string;
    status: string;
}

export interface FinalizeQuizzeResponse {
    status: string;
    questions?: {
        questions: GeneratedQuizQuestion[];
    };
    message?: string;
}

const generateQuizzeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateQuizze: builder.mutation<GenerateQuizzeResponse, GenerateQuizzePayload>({
            query: (body) => ({
                url: "api/v1/service/course/generate-questions/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Quizze" as const, id: "LIST" }],
        }),

        finalizeQuizze: builder.query<FinalizeQuizzeResponse, number | string>({
            query: (taskId) => ({
                url: `api/v1/service/course/generate-questions/${taskId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, taskId) => [
                { type: "Quizze" as const, id: taskId },
            ],
        }),
    }),
});

export const {
    useGenerateQuizzeMutation,
    useFinalizeQuizzeQuery,
} = generateQuizzeApi;
