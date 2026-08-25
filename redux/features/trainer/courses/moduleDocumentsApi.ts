import { baseApi } from "@/redux/api/baseApi";

export interface Document {
    id: number;
    module: number | string;
    title: string;
    pdf_file: string;
    created_at: string;
    updated_at: string;
}

export interface DocumentMutationResponse {
    message: string;
    document: Document;
}

export interface DeleteDocumentResponse {
    message: string;
}

export interface UpdateDocumentPayload {
    formData: FormData;
    DocumentId: number | string;
}

const DocumentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDocumentList: builder.query<Document[], void>({
            query: () => ({
                url: "api/v1/service/trainer/lessons/documents/",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Document" as const, id })),
                        { type: "Document" as const, id: "LIST" },
                    ]
                    : [{ type: "Document" as const, id: "LIST" }],
        }),

        getSingleDocument: builder.query<Document, number | string>({
            query: (DocumentId) => ({
                url: `api/v1/service/trainer/lessons/documents/${DocumentId}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, DocumentId) => [
                { type: "Document" as const, id: DocumentId },
            ],
        }),

        createDocument: builder.mutation<DocumentMutationResponse, FormData>({
            query: (formData) => ({
                url: "api/v1/service/trainer/lessons/documents/",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Document" as const, id: "LIST" }],
        }),

        updateDocument: builder.mutation<DocumentMutationResponse, UpdateDocumentPayload>({
            query: ({ formData, DocumentId }) => ({
                url: `api/v1/service/trainer/lessons/documents/${DocumentId}/`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (_result, _error, { DocumentId }) => [
                { type: "Document" as const, id: DocumentId },
                { type: "Document" as const, id: "LIST" },
            ],
        }),

        deleteDocument: builder.mutation<DeleteDocumentResponse, number | string>({
            query: (DocumentId) => ({
                url: `api/v1/service/trainer/lessons/documents/${DocumentId}/`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, DocumentId) => [
                { type: "Document" as const, id: DocumentId },
                { type: "Document" as const, id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetDocumentListQuery,
    useGetSingleDocumentQuery,
    useCreateDocumentMutation,
    useUpdateDocumentMutation,
    useDeleteDocumentMutation,
} = DocumentsApi;