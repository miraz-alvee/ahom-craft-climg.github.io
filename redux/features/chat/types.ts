// ---------- Create/open a room ----------
export interface CreateRoomPayload {
  user2: number;
}

export interface ChatRoom {
  room_id: number;
  sender_id: number;
  sender_name?: string;
  receiver_id: number;
  user2?: number;
  receiver_name?: string;
  last_message?: string | null;
  created_at?: string;
}

// ---------- Message history ----------
export interface ChatMessage {
  id: number;
  room: number;
  sender: number;
  receiver_id?: string | number;
  text: string;
  created_at: string;
}