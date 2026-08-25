"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import { ChatMessage } from "@/redux/features/chat/types";

export type SocketConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export function useChatSocket(roomId: number | null) {
  const token = useSelector(selectToken);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isManuallyClosedRef = useRef<boolean>(false);
  const pendingQueueRef = useRef<string[]>([]);
  const activeRoomIdRef = useRef<number | null>(roomId);

  const [status, setStatus] = useState<SocketConnectionStatus>("disconnected");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    activeRoomIdRef.current = roomId;
  }, [roomId]);

  // Function to build WebSocket URL
  const getWebSocketUrl = useCallback((rId: number, authToken: string) => {
    const rawEnvUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://craft.dsrt321.online";
    let cleanHost = rawEnvUrl
      .replace(/^wss:\/\//i, "")
      .replace(/^ws:\/\//i, "")
      .replace(/^https:\/\//i, "")
      .replace(/^http:\/\//i, "")
      .replace(/\/+$/, "");

    let scheme = "ws";
    if (rawEnvUrl.startsWith("wss") || (typeof window !== "undefined" && window.location.protocol === "https:")) {
      scheme = "wss";
    }

    return `${scheme}://${cleanHost}/ws/chat/${rId}/?token=${authToken}`;
  }, []);

  // Connection Handler
  const connectSocket = useCallback(() => {
    if (!roomId || !token) {
      setStatus("disconnected");
      return;
    }

    // Clear existing timer if any
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    // Safely close existing socket if open or connecting
    if (socketRef.current) {
      const oldSocket = socketRef.current;
      socketRef.current = null;
      isManuallyClosedRef.current = true;
      if (oldSocket.readyState === WebSocket.OPEN) {
        oldSocket.close();
      } else if (oldSocket.readyState === WebSocket.CONNECTING) {
        oldSocket.onopen = () => oldSocket.close();
      }
    }

    isManuallyClosedRef.current = false;
    setStatus("connecting");

    try {
      const url = getWebSocketUrl(roomId, token);
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        setStatus("connected");
        // Flush any queued messages once connected
        if (pendingQueueRef.current.length > 0) {
          pendingQueueRef.current.forEach((txt) => {
            try {
              socket.send(JSON.stringify({ text: txt, message: txt }));
            } catch (e) {
              console.error("Error flushing queued socket message:", e);
            }
          });
          pendingQueueRef.current = [];
        }
      };

      socket.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          const dataObj = raw.message && typeof raw.message === "object" ? raw.message : raw;

          const normalizedMessage: ChatMessage = {
            id: dataObj.id ?? dataObj.message_id ?? Date.now(),
            room: Number(dataObj.room ?? activeRoomIdRef.current ?? 0),
            sender: Number(dataObj.sender ?? dataObj.sender_id ?? 0),
            receiver_id: dataObj.receiver_id ?? dataObj.receiver ?? "",
            text: dataObj.text ?? dataObj.message ?? (typeof raw === "string" ? raw : ""),
            created_at: dataObj.created_at ?? dataObj.timestamp ?? new Date().toISOString(),
          };

          setMessages((prev) => {
            const exists = prev.some((m) => m.id === normalizedMessage.id && m.id !== 0);
            if (exists) return prev;
            return [...prev, normalizedMessage];
          });
        } catch {
          if (typeof event.data === "string" && event.data.trim()) {
            const fallbackMessage: ChatMessage = {
              id: Date.now(),
              room: activeRoomIdRef.current || 0,
              sender: 0,
              receiver_id: "",
              text: event.data,
              created_at: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, fallbackMessage]);
          }
        }
      };

      socket.onerror = () => {
        setStatus("error");
      };

      socket.onclose = () => {
        setStatus("disconnected");
        socketRef.current = null;

        // Auto-reconnect after 5s matching Flutter logic
        if (!isManuallyClosedRef.current) {
          reconnectTimerRef.current = setTimeout(() => {
            if (activeRoomIdRef.current && token) {
              connectSocket();
            }
          }, 5000);
        }
      };
    } catch (e) {
      console.error("WebSocket connection setup failed:", e);
      setStatus("error");
    }
  }, [roomId, token, getWebSocketUrl]);

  // Connect on roomId or token change
  useEffect(() => {
    pendingQueueRef.current = [];
    setMessages([]);
    connectSocket();

    return () => {
      isManuallyClosedRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (socketRef.current) {
        const socketToClose = socketRef.current;
        socketRef.current = null;
        if (socketToClose.readyState === WebSocket.OPEN) {
          socketToClose.close();
        } else if (socketToClose.readyState === WebSocket.CONNECTING) {
          socketToClose.onopen = () => socketToClose.close();
        }
      }
    };
  }, [connectSocket]);

  // Manual reconnect trigger
  const manualReconnect = useCallback(() => {
    connectSocket();
  }, [connectSocket]);

  // Send message function
  const sendMessage = useCallback((text: string) => {
    const socket = socketRef.current;

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify({ text, message: text }));
        return true;
      } catch (err) {
        console.error("Failed to send message:", err);
        return false;
      }
    }

    if (socket && socket.readyState === WebSocket.CONNECTING) {
      // Queue message until connection completes
      pendingQueueRef.current.push(text);
      return true;
    }

    console.warn("WebSocket is not connected. Message not sent.");
    return false;
  }, []);

  const setInitialMessages = useCallback((history: ChatMessage[]) => {
    setMessages(history);
  }, []);

  return {
    status,
    messages,
    sendMessage,
    setInitialMessages,
    reconnect: manualReconnect,
  };
}