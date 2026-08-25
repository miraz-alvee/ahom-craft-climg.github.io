export type MessageSender = 'user' | 'assistant';

export interface ChatMessage {
    id: number;
    session: number;
    sender: MessageSender;
    message: string;
    created_at: string;
}

export interface ChatSession {
    id: number;
    user: string;
    session_name: string;
    created_at: string;
}

// POST /api/v1/service/chat/
// session_id: 0 starts a brand new session — the backend creates one and
// returns its real id via data.user_message.session
export interface SendMessagePayload {
    session_id: number;
    user_message: string;
}

export interface SendMessageResponse {
    message: string;
    data: {
        user_message: ChatMessage;
        bot_message: ChatMessage;
    };
}

// GET /api/v1/service/chat-sessions/list/ — confirmed: plain array
export type ChatSessionListResponse = ChatSession[];

// GET /api/v1/service/chat-sessions/messages/{id}/ — confirmed: the session
// object itself, with its messages nested inside
export interface ChatSessionMessagesResponse extends ChatSession {
    messages: ChatMessage[];
}

// PUT /api/v1/service/chat-sessions/{id}/
export interface UpdateChatSessionPayload {
    id: number;
    session_name: string;
}

// PATCH /api/v1/service/chat-sessions/{id}/
export type PatchChatSessionPayload = Partial<Pick<ChatSession, 'session_name'>> & {
    id: number;
};