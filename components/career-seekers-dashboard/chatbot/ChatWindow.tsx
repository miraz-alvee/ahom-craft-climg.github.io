'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MoreVertical, Send } from 'lucide-react';
import { ChatMessage } from '@/redux/features/career-seeker/chatbot/types';
import { useGetChatSessionMessagesQuery, useSendChatMessageMutation } from '@/redux/features/career-seeker/chatbot/chatBotApis';


interface ChatWindowProps {
    sessionId: number;
    onBack?: () => void;
}

export default function ChatWindow({ sessionId, onBack }: ChatWindowProps) {
    const [messageInput, setMessageInput] = useState('');
    // Messages we know about locally before/ahead of the next successful
    // refetch — lets the sent message and the bot reply show up instantly
    // instead of waiting on the background refetch triggered by cache
    // invalidation.
    const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const {
        data: session,
        isLoading: isMessagesLoading,
        isError: isMessagesError,
    } = useGetChatSessionMessagesQuery(sessionId);

    const [sendChatMessage, { isLoading: isSending }] = useSendChatMessageMutation();

    // Reset local overlay whenever the session changes
    useEffect(() => {
        setLocalMessages([]);
        setIsBotTyping(false);
    }, [sessionId]);

    const fetchedMessages = session?.messages ?? [];
    const fetchedIds = new Set(fetchedMessages.map((m) => m.id));
    // Only keep local messages the server hasn't caught up to yet
    const pendingLocalMessages = localMessages.filter((m) => !fetchedIds.has(m.id));
    const messages = [...fetchedMessages, ...pendingLocalMessages].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, isBotTyping]);

    const handleSend = async () => {
        const trimmed = messageInput.trim();
        if (!trimmed || isSending) return;

        const tempId = -Date.now();
        const optimisticMessage: ChatMessage = {
            id: tempId,
            session: sessionId,
            sender: 'user',
            message: trimmed,
            created_at: new Date().toISOString(),
        };

        setMessageInput('');
        setLocalMessages((prev) => [...prev, optimisticMessage]);
        setIsBotTyping(true);

        try {
            const response = await sendChatMessage({
                session_id: sessionId,
                user_message: trimmed,
            }).unwrap();

            // Swap the optimistic message for the real ones, so we don't
            // depend on the background refetch to display the reply.
            setLocalMessages((prev) => [
                ...prev.filter((m) => m.id !== tempId),
                response.data.user_message,
                response.data.bot_message,
            ]);
        } catch {
            // Send failed — drop the optimistic bubble and restore the draft
            setLocalMessages((prev) => prev.filter((m) => m.id !== tempId));
            setMessageInput(trimmed);
        } finally {
            setIsBotTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex-1 flex flex-col rounded-3xl">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {onBack && (
                        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onBack}>
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-semibold text-white">
                        {session?.user
                            ? session.user
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()
                            : "??"}
                    </div>

                    <h2 className="font-inter font-semibold text-gray-900">
                        {session?.session_name || 'Chat'}
                    </h2>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {isMessagesLoading && (
                    <p className="font-inter text-sm text-gray-500">Loading messages...</p>
                )}

                {isMessagesError && (
                    <p className="font-inter text-sm text-red-500">
                        Couldn't load messages for this chat.
                    </p>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xl px-4 py-3 rounded-2xl ${msg.sender === 'user'
                                ? 'font-inter bg-cyan-200 text-gray-900'
                                : 'font-inter bg-gray-200 text-gray-900'
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                    </div>
                ))}

                {isBotTyping && (
                    <div className="mb-4 flex justify-start">
                        <div className="bg-gray-200 rounded-2xl px-4 py-3 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSending}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-400 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 font-inter disabled:opacity-60"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isSending || !messageInput.trim()}
                        className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}