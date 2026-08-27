"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import ChatWindow from "@/components/shared/chat/ChatWindow";
import { ChatRoom } from "@/redux/features/chat/types";
import { useGetRoomsQuery } from "@/redux/features/chat/chatApis";
import { MessageSquare, Sparkles } from "lucide-react";
import ChatSidebar from "@/components/shared/chat/chatSideber";

// Helper to decode user ID from JWT token
function getUserIdFromToken(token: string | null): number | null {
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

function ChatPageContent() {
    const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
    const token = useSelector(selectToken);
    const searchParams = useSearchParams();
    const roomIdParam = searchParams.get("roomId");

    const currentUserId = useMemo(() => getUserIdFromToken(token), [token]);

    const { data: rooms } = useGetRoomsQuery(undefined, {
        pollingInterval: 10000,
    });

    // Automatically select room if roomId search param is present in URL
    useEffect(() => {
        if (roomIdParam && rooms) {
            const targetRoom = rooms.find((r) => r.room_id === Number(roomIdParam));
            if (targetRoom) {
                setActiveRoom(targetRoom);
            } else if (Number(roomIdParam)) {
                // Fallback room object while list is refreshing
                setActiveRoom((prev) => {
                    if (prev?.room_id === Number(roomIdParam)) return prev;
                    return {
                        room_id: Number(roomIdParam),
                        sender_id: currentUserId || 0,
                        receiver_id: 0,
                        receiver_name: "Employer",
                        last_message: null,
                    };
                });
            }
        }
    }, [roomIdParam, rooms, currentUserId]);

    return (
        <div className="p-4 md:p-6 w-full h-full bg-[#f4f6fb]">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                            Trade Person Direct Chat
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Connect in real-time with clients, contractors, and team members.
                        </p>
                    </div>
                </div>

                {/* Main Chat Container */}
                <div className="h-188 max-h-[calc(100vh-12rem)] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col md:flex-row">
                    {/* Sidebar Panel */}
                    <div
                        className={`h-full w-full md:w-80 lg:w-96 shrink-0 ${activeRoom ? "hidden md:block" : "block"
                            }`}
                    >
                        <ChatSidebar
                            activeRoomId={activeRoom?.room_id ?? null}
                            onSelectRoom={setActiveRoom}
                            currentUserId={currentUserId}
                        />
                    </div>

                    {/* Chat Window Panel */}
                    <div
                        className={`h-full flex-1 min-w-0 ${activeRoom ? "block" : "hidden md:block"
                            }`}
                    >
                        {activeRoom ? (
                            <ChatWindow
                                room={activeRoom}
                                onBack={() => setActiveRoom(null)}
                                currentUserId={currentUserId}
                            />
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-900/30">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs">
                                    <Sparkles className="h-8 w-8" />
                                </div>
                                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                                    Select a conversation
                                </h3>
                                <p className="mt-1 text-xs text-slate-400 max-w-sm">
                                    Choose an existing chat room from the sidebar or click "+ New Chat" to start messaging.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TradePersonChatPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-xs text-slate-400">Loading chat...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}