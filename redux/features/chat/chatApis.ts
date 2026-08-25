import { baseApi } from "@/redux/api/baseApi";
import { ChatRoom, CreateRoomPayload, ChatMessage } from "./types";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<ChatRoom[], void>({
      query: () => ({
        url: "api/v1/chat/chat/rooms/",
        method: "GET",
      }),
      transformResponse: (response: any): ChatRoom[] => {
        if (!Array.isArray(response)) return [];
        return response.map((room) => ({
          ...room,
          room_id: Number(room.room_id ?? room.id ?? 0),
          sender_id: Number(room.sender_id ?? 0),
          receiver_id: Number(room.receiver_id ?? room.user2 ?? 0),
          user2: Number(room.user2 ?? room.receiver_id ?? 0),
          sender_name: room.sender_name ?? `User #${room.sender_id}`,
          receiver_name: room.receiver_name ?? `User #${room.receiver_id || room.user2}`,
        }));
      },
      providesTags: ["Chat"],
    }),

    createRoom: builder.mutation<ChatRoom, CreateRoomPayload>({
      query: (body) => ({
        url: "api/v1/chat/chat/rooms/",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): ChatRoom => {
        const raw = response?.data ?? response;
        const rId = Number(raw?.room_id ?? raw?.id ?? 0);
        return {
          ...raw,
          room_id: rId,
          sender_id: Number(raw?.sender_id ?? 0),
          receiver_id: Number(raw?.receiver_id ?? raw?.user2 ?? 0),
          user2: Number(raw?.user2 ?? raw?.receiver_id ?? 0),
          sender_name: raw?.sender_name ?? `User #${raw?.sender_id}`,
          receiver_name: raw?.receiver_name ?? `User #${raw?.receiver_id || raw?.user2}`,
        };
      },
      invalidatesTags: ["Chat"],
    }),

    getRoomMessages: builder.query<ChatMessage[], number>({
      query: (roomId) => ({
        url: `api/v1/chat/chat/rooms/${roomId}/messages/`,
        method: "GET",
      }),
      transformResponse: (response: any): ChatMessage[] => {
        if (!Array.isArray(response)) return [];
        return response.map((msg) => ({
          ...msg,
          id: Number(msg.id ?? msg.message_id ?? Date.now()),
          room: Number(msg.room ?? 0),
          sender: Number(msg.sender ?? msg.sender_id ?? 0),
          receiver_id: msg.receiver_id ?? msg.receiver ?? "",
          text: msg.text ?? msg.message ?? "",
          created_at: msg.created_at ?? msg.timestamp ?? new Date().toISOString(),
        }));
      },
      providesTags: (result, error, roomId) => [{ type: "Chat", id: roomId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useGetRoomMessagesQuery,
} = chatApi;