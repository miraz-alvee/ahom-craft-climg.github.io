"use client";

import { useState } from "react";
import { useCreateRoomMutation } from "@/redux/features/chat/chatApis";
import { ChatRoom } from "@/redux/features/chat/types";
import { UserPlus, Loader2 } from "lucide-react";

interface Props {
  onRoomReady: (room: ChatRoom) => void;
  onCancel?: () => void;
}

export default function StartChatForm({ onRoomReady, onCancel }: Props) {
  const [userId, setUserId] = useState("");
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const [error, setError] = useState<string | null>(null);

  const handleStart = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    const id = Number(userId.trim());
    if (!id || isNaN(id) || id <= 0) {
      setError("Please enter a valid numeric User ID.");
      return;
    }

    try {
      const room = await createRoom({ user2: id }).unwrap();
      if (room) {
        onRoomReady(room);
      }
    } catch (err: unknown) {
      console.error("Failed to create chat room:", err);
      const apiErr = err as { data?: { detail?: string; error?: string } };
      setError(apiErr?.data?.detail || apiErr?.data?.error || "Could not start chat with that user.");
    }
  };

  return (
    <form onSubmit={handleStart} className="space-y-3 p-1">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Start Conversation
        </h4>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type="number"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter target User ID (e.g. 5)"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !userId.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Creating Room...</span>
          </>
        ) : (
          <>
            <UserPlus className="h-3.5 w-3.5" />
            <span>Start Chat</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-[11px] font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}