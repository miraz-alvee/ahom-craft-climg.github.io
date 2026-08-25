'use client';


import ChatSidebar from "@/components/trade-person-dashboard/chatbot/ChatSidebar";
import ChatWindow from "@/components/trade-person-dashboard/chatbot/ChatWindow";
import { useState } from "react";


// number = an existing session; 'new' = composing a session that doesn't
// exist on the backend yet; null = nothing selected
type Selection = number | 'new' | null;

export default function ChatPage() {
    const [selection, setSelection] = useState<Selection>(null);

    return (
        <div className="flex h-full bg-[#f4f6fb]">
            <ChatSidebar
                selectedSessionId={typeof selection === 'number' ? selection : null}
                onSelectSession={setSelection}
                onNewChat={() => setSelection('new')}
            />

            {selection === 'new' && (
                <ChatWindow
                    onBack={() => setSelection(null)}
                    onSessionCreated={(newSessionId) => setSelection(newSessionId)}
                />
            )}

            {typeof selection === 'number' && (
                <ChatWindow sessionId={selection} onBack={() => setSelection(null)} />
            )}

            {selection === null && (
                <div className="flex-1 flex items-center justify-center text-gray-400 font-inter text-sm">
                    Select a chat, or start a new one
                </div>
            )}
        </div>
    );
}