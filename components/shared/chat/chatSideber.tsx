"use client";

import { useState, useMemo } from "react";
import StartChatForm from "./StartChatForm";
import { ChatRoom } from "@/redux/features/chat/types";
import { useGetRoomsQuery } from "@/redux/features/chat/chatApis";
import { MessageSquarePlus, Search, MessageSquare, RefreshCw } from "lucide-react";

interface Props {
  activeRoomId: number | null;
  onSelectRoom: (room: ChatRoom) => void;
  currentUserId?: number | null;
}

export default function ChatSidebar({ activeRoomId, onSelectRoom, currentUserId }: Props) {
  const { data: rooms, isLoading, isError, refetch } = useGetRoomsQuery(undefined, {
    pollingInterval: 15000, // Background polling to catch new rooms
  });
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to determine room display name
  const getRoomDisplayName = (room: ChatRoom) => {
    if (currentUserId && room.receiver_id === currentUserId) {
      return room.sender_name || `User #${room.sender_id}`;
    }
    return room.receiver_name || `User #${room.receiver_id || room.user2}`;
  };

  // Filter rooms based on search query
  const filteredRooms = useMemo(() => {
    if (!rooms) return [];
    if (!searchQuery.trim()) return rooms;
    const q = searchQuery.toLowerCase().trim();
    return rooms.filter((room) => {
      const name = getRoomDisplayName(room).toLowerCase();
      const lastMsg = (room.last_message || "").toLowerCase();
      return name.includes(q) || lastMsg.includes(q);
    });
  }, [rooms, searchQuery, currentUserId]);

  return (
    <div className="flex h-full w-full md:w-80 lg:w-96 flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Messages</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {rooms ? `${rooms.length} ${rooms.length === 1 ? "conversation" : "conversations"}` : "Direct Chat"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewChat((prev) => !prev)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            showNewChat
              ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          <span>{showNewChat ? "Close" : "New Chat"}</span>
        </button>
      </div>

      {/* New Chat Form Drawer */}
      {showNewChat && (
        <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3">
          <StartChatForm
            onCancel={() => setShowNewChat(false)}
            onRoomReady={(room) => {
              setShowNewChat(false);
              onSelectRoom(room);
            }}
          />
        </div>
      )}

      {/* Search Input */}
      <div className="border-b border-slate-100 dark:border-slate-800 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Room List Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-900">
        {isLoading && (
          <div className="space-y-3 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2.5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-6 text-center">
            <p className="text-xs text-red-500 mb-2">Failed to load conversations.</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredRooms.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {searchQuery ? "No conversations match your search." : "No conversations yet."}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Click "+ New Chat" to start messaging.
            </p>
          </div>
        )}

        {filteredRooms.map((room) => {
          const isActive = room.room_id === activeRoomId;
          const displayName = getRoomDisplayName(room);
          const initial = displayName.charAt(0).toUpperCase();

          return (
            <button
              key={room.room_id}
              onClick={() => onSelectRoom(room)}
              className={`group flex w-full items-start gap-3 p-3.5 text-left transition ${
                isActive
                  ? "bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600"
                  : "hover:bg-slate-50 dark:hover:bg-slate-900 border-l-4 border-transparent"
              }`}
            >
              {/* User Avatar */}
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                  {initial}
                </div>
              </div>

              {/* Chat Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {displayName}
                  </span>
                  {room.created_at && (
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {new Date(room.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {room.last_message || "No messages yet"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}