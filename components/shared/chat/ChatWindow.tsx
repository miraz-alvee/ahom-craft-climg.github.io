"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useChatSocket, SocketConnectionStatus } from "./useChatSocket";
import { ChatRoom } from "@/redux/features/chat/types";
import { useGetRoomMessagesQuery } from "@/redux/features/chat/chatApis";
import { Send, ArrowLeft, Wifi, WifiOff, Loader2 } from "lucide-react";

interface Props {
  room: ChatRoom;
  onBack?: () => void;
  currentUserId?: number | null;
}

// Token helper to extract current user ID from JWT token payload
function parseUserIdFromToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);
    return parsed.user_id ? Number(parsed.user_id) : (parsed.id ? Number(parsed.id) : null);
  } catch {
    return null;
  }
}

export default function ChatWindow({ room, onBack, currentUserId: propUserId }: Props) {
  const token = useSelector(selectToken);

  // Resolve current user ID
  const effectiveUserId = useMemo(() => {
    if (propUserId) return propUserId;
    const fromToken = parseUserIdFromToken(token);
    if (fromToken) return fromToken;
    return room.sender_id;
  }, [propUserId, token, room.sender_id]);

  // Determine conversation partner display name
  const partnerName = useMemo(() => {
    if (effectiveUserId === room.receiver_id) {
      return room.sender_name || `User #${room.sender_id}`;
    }
    return room.receiver_name || `User #${room.receiver_id || room.user2}`;
  }, [effectiveUserId, room]);

  // WebSocket Hook
  const { status, messages, sendMessage, setInitialMessages, reconnect } = useChatSocket(room.room_id);

  // REST API Query: Auto-polls every 5s if WebSocket is not connected
  const { data: history, isLoading: isHistoryLoading } = useGetRoomMessagesQuery(room.room_id, {
    pollingInterval: status !== "connected" ? 5000 : 0,
  });

  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const loadedRoomIdRef = useRef<number | null>(null);

  // Sync REST history into socket message state once loaded per room
  useEffect(() => {
    if (history) {
      setInitialMessages(history);
      loadedRoomIdRef.current = room.room_id;
    }
  }, [history, room.room_id, setInitialMessages]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const sent = sendMessage(trimmed);
    if (sent) {
      setDraft("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper for status badge
  const renderStatusBadge = (s: SocketConnectionStatus) => {
    switch (s) {
      case "connected":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live WebSocket
          </span>
        );
      case "connecting":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Loader2 className="h-3 w-3 animate-spin" />
            Connecting...
          </span>
        );
      case "disconnected":
      case "error":
      default:
        return (
          <button
            onClick={reconnect}
            title="Click to reconnect WebSocket"
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            <WifiOff className="h-3 w-3 text-slate-400" />
            Offline (Retry)
          </button>
        );
    }
  };

  // Helper to format date label
  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "Today";
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
              {partnerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {partnerName}
              </h3>
              <p className="text-[10px] text-slate-400">
                Room #{room.room_id}
              </p>
            </div>
          </div>
        </div>

        <div>{renderStatusBadge(status)}</div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-slate-50/40 dark:bg-slate-900/40">
        {isHistoryLoading && messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              Loading messages...
            </div>
          </div>
        )}

        {!isHistoryLoading && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Wifi className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Start of conversation
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Send a message below to begin chatting.
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isMine = Number(msg.sender) === Number(effectiveUserId);

          // Render date separator if first message or date changed
          const prevMsg = messages[index - 1];
          const showDateSeparator =
            !prevMsg ||
            formatDateLabel(msg.created_at) !== formatDateLabel(prevMsg.created_at);

          return (
            <div key={`${msg.id}-${index}`} className="space-y-3">
              {showDateSeparator && formatDateLabel(msg.created_at) && (
                <div className="my-2 flex items-center justify-center">
                  <span className="rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400">
                    {formatDateLabel(msg.created_at)}
                  </span>
                </div>
              )}

              <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                    isMine
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap warp-break-words leading-relaxed">{msg.text}</p>
                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${
                      isMine ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    <span>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 shrink-0"
            title="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}