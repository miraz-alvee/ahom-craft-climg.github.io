'use client';

import { useState } from "react";
import ChatSidebar from "@/components/career-seekers-dashboard/chatbot/ChatSidebar";
import ChatWindow from "@/components/career-seekers-dashboard/chatbot/ChatWindow";


export default function ChatPage() {
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

    return (
        <div className="flex h-full bg-[#f4f6fb]">
            <ChatSidebar
                selectedSessionId={selectedSessionId}
                onSelectSession={setSelectedSessionId}
            />

            {selectedSessionId ? (
                <ChatWindow
                    sessionId={selectedSessionId}
                    onBack={() => setSelectedSessionId(null)}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 font-inter text-sm">
                    Select a chat to start messaging
                </div>
            )}
        </div>
    );
}