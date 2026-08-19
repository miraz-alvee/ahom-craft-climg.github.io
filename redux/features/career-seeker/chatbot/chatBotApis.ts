import { baseApi } from "@/redux/api/baseApi";
import type {
    ChatSession,
    ChatSessionListResponse,
    ChatSessionMessagesResponse,
    PatchChatSessionPayload,
    SendMessagePayload,
    SendMessageResponse,
    UpdateChatSessionPayload,
} from "./types";

// NOTE: this relies on baseApi having 'ChatSession' and 'ChatMessages' in its
// tagTypes array (in the createApi() call), e.g.:
//   tagTypes: ['Profile', 'Cart', 'ShippingAddress', 'Orders', 'ChatSession', 'ChatMessages']
// Without that, TypeScript will error on the tag objects below (tagTypes is
// strictly typed, not just a runtime list).

const chatBotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST /api/v1/service/chat/
        sendChatMessage: builder.mutation<SendMessageResponse, SendMessagePayload>({
            query: (payload) => ({
                url: 'api/v1/service/chat/',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ChatMessages', id: arg.session_id },
                { type: 'ChatSession', id: 'LIST' },
            ],
        }),

        // GET /api/v1/service/chat-sessions/{id}/
        getChatSession: builder.query<ChatSession, number>({
            query: (id) => ({
                url: `api/v1/service/chat-sessions/${id}/`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'ChatSession', id }],
        }),

        // PUT /api/v1/service/chat-sessions/{id}/
        updateChatSession: builder.mutation<ChatSession, UpdateChatSessionPayload>({
            query: ({ id, ...body }) => ({
                url: `api/v1/service/chat-sessions/${id}/`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ChatSession', id: arg.id },
                { type: 'ChatSession', id: 'LIST' },
            ],
        }),

        // PATCH /api/v1/service/chat-sessions/{id}/
        patchChatSession: builder.mutation<ChatSession, PatchChatSessionPayload>({
            query: ({ id, ...body }) => ({
                url: `api/v1/service/chat-sessions/${id}/`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ChatSession', id: arg.id },
                { type: 'ChatSession', id: 'LIST' },
            ],
        }),

        // DELETE /api/v1/service/chat-sessions/{id}/
        deleteChatSession: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `api/v1/service/chat-sessions/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'ChatSession', id },
                { type: 'ChatSession', id: 'LIST' },
            ],
        }),

        // GET /api/v1/service/chat-sessions/list/
        getChatSessionsList: builder.query<ChatSessionListResponse, void>({
            query: () => ({
                url: 'api/v1/service/chat-sessions/list/',
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((session) => ({ type: 'ChatSession' as const, id: session.id })),
                        { type: 'ChatSession', id: 'LIST' },
                    ]
                    : [{ type: 'ChatSession', id: 'LIST' }],
        }),

        // GET /api/v1/service/chat-sessions/messages/{id}/
        getChatSessionMessages: builder.query<ChatSessionMessagesResponse, number>({
            query: (sessionId) => ({
                url: `api/v1/service/chat-sessions/messages/${sessionId}/`,
                method: 'GET',
            }),
            providesTags: (result, error, sessionId) => [{ type: 'ChatMessages', id: sessionId }],
        }),
    }),
});

export const {
    useSendChatMessageMutation,
    useGetChatSessionQuery,
    useUpdateChatSessionMutation,
    usePatchChatSessionMutation,
    useDeleteChatSessionMutation,
    useGetChatSessionsListQuery,
    useGetChatSessionMessagesQuery,
} = chatBotApi;