'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
    useGetChatSessionsListQuery,
    usePatchChatSessionMutation,
    useDeleteChatSessionMutation,
} from '@/redux/features/career-seeker/chatbot/chatBotApis';
import { ChatSession } from '@/redux/features/career-seeker/chatbot/types';


interface ChatSidebarProps {
    selectedSessionId: number | null;
    onSelectSession: (sessionId: number | null) => void;
}

function isToday(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    );
}

export default function ChatSidebar({ selectedSessionId, onSelectSession }: ChatSidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const menuRef = useRef<HTMLDivElement | null>(null);

    const { data: sessions, isLoading, isError } = useGetChatSessionsListQuery();
    const [patchChatSession, { isLoading: isRenaming }] = usePatchChatSessionMutation();
    const [deleteChatSession, { isLoading: isDeleting }] = useDeleteChatSessionMutation();

    // Close the "⋮" menu when clicking anywhere outside it
    useEffect(() => {
        if (openMenuId === null) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    const filteredSessions = useMemo(() => {
        if (!sessions) return [];
        if (!searchTerm.trim()) return sessions;
        return sessions.filter((session) =>
            session.session_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sessions, searchTerm]);

    const todaySessions = filteredSessions.filter((session) => isToday(session.created_at));
    const earlierSessions = filteredSessions.filter((session) => !isToday(session.created_at));

    const startRename = (session: ChatSession) => {
        setEditingId(session.id);
        setEditValue(session.session_name);
        setOpenMenuId(null);
    };

    const submitRename = async (sessionId: number) => {
        const trimmed = editValue.trim();
        setEditingId(null);
        if (!trimmed) return;
        try {
            await patchChatSession({ id: sessionId, session_name: trimmed }).unwrap();
        } catch {
            // silently ignore — list stays on the previous name since we never
            // optimistically changed it
        }
    };

    const handleDelete = async (sessionId: number) => {
        setOpenMenuId(null);
        const confirmed = window.confirm('Delete this chat? This can\'t be undone.');
        if (!confirmed) return;
        try {
            await deleteChatSession(sessionId).unwrap();
            if (selectedSessionId === sessionId) {
                onSelectSession(null);
            }
        } catch {
            // no-op — list refetch will just show the session still there
        }
    };

    const renderSession = (session: ChatSession) => {
        const isEditing = editingId === session.id;

        return (
            <div
                key={session.id}
                className={`relative flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-50 ${selectedSessionId === session.id ? 'bg-gray-50' : ''
                    }`}
                onClick={() => !isEditing && onSelectSession(session.id)}
            >
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-semibold text-white shrink-0">
                    {session.user?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        {isEditing ? (
                            <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitRename(session.id);
                                    if (e.key === 'Escape') setEditingId(null);
                                }}
                                onBlur={() => submitRename(session.id)}
                                disabled={isRenaming}
                                className="w-full text-sm font-inter font-semibold text-gray-900 border border-cyan-400 rounded px-1 py-0.5 focus:outline-none"
                            />
                        ) : (
                            <h3 className="font-inter font-semibold text-sm text-gray-900 truncate">
                                {session.session_name || `Session #${session.id}`}
                            </h3>
                        )}

                        <button
                            className="p-1 rounded hover:bg-gray-200 shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === session.id ? null : session.id);
                            }}>

                            <MoreVertical className="cursor-pointer w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <p className="font-inter text-sm text-gray-600 truncate">{session.user}</p>
                </div>

                {openMenuId === session.id && (
                    <div
                        ref={menuRef}
                        className="absolute right-4 top-12 z-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-inter text-gray-700 hover:bg-gray-50"
                            onClick={() => startRename(session)}
                        >
                            <Pencil className="w-4 h-4" /> Rename
                        </button>
                        <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-inter text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(session.id)}
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-100 border-r border-gray-200 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search your chat"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading && (
                    <p className="font-inter px-4 py-3 text-sm text-gray-500">Loading chats...</p>
                )}

                {isError && (
                    <p className="font-inter px-4 py-3 text-sm text-red-500">
                        Couldn't load your chats. Please try again.
                    </p>
                )}

                {!isLoading && !isError && filteredSessions.length === 0 && (
                    <p className="font-inter px-4 py-3 text-sm text-gray-500">No chats yet.</p>
                )}

                {todaySessions.length > 0 && (
                    <>
                        <div className="font-inter px-4 py-2 text-xs font-semibold text-gray-500">
                            Today
                        </div>
                        {todaySessions.map(renderSession)}
                    </>
                )}

                {earlierSessions.length > 0 && (
                    <>
                        <div className="font-inter px-4 py-2 text-xs font-semibold text-gray-500 mt-2">
                            Earlier
                        </div>
                        {earlierSessions.map(renderSession)}
                    </>
                )}
            </div>
        </div>
    );
}