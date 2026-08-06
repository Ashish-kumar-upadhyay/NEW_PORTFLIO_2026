"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  localChatEngine,
  streamResponse,
  WELCOME_MESSAGE,
} from "@/components/ai-chat/KnowledgeBase";
import type { ChatEngine, ChatMessage } from "@/components/ai-chat/types";

const STORAGE_KEY = "ashish-ai-chat-history";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed.filter((m) => m.role && m.content) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    const toSave = messages.filter((m) => !m.isStreaming).slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    /* quota exceeded — ignore */
  }
}

type UseChatOptions = {
  engine?: ChatEngine;
};

export function useChat(options: UseChatOptions = {}) {
  const engine = options.engine ?? localChatEngine;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const saved = loadHistory();
    if (saved.length > 0) {
      setMessages(saved);
    } else {
      setMessages([
        {
          id: createId(),
          role: "assistant",
          content: WELCOME_MESSAGE,
          timestamp: Date.now(),
        },
      ]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && messages.length > 0 && !messages.some((m) => m.isStreaming)) {
      saveHistory(messages);
    }
  }, [messages, hydrated]);

  const clearChat = useCallback(() => {
    abortRef.current = true;
    const welcome: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: Date.now(),
    };
    setMessages([welcome]);
    setIsTyping(false);
    setIsStreaming(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping || isStreaming) return;

      abortRef.current = false;

      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const assistantId = createId();
      const assistantPlaceholder: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
      setInput("");
      setIsTyping(true);
      setIsStreaming(true);

      try {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

        if (abortRef.current) return;

        setIsTyping(false);

        const history = [...messagesRef.current, userMsg];
        const fullResponse = await engine.generateResponse(trimmed, history);

        if (abortRef.current) return;

        let accumulated = "";
        for await (const chunk of streamResponse(fullResponse)) {
          if (abortRef.current) break;
          accumulated += chunk;
          const current = accumulated;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: current } : m
            )
          );
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: accumulated || fullResponse, isStreaming: false }
              : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Sorry, something went wrong. Please try again or contact Ashish directly.",
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsTyping(false);
        setIsStreaming(false);
      }
    },
    [engine, isStreaming, isTyping]
  );

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => {
    setIsOpen(false);
    abortRef.current = true;
  }, []);
  const toggleChat = useCallback(() => setIsOpen((v) => !v), []);

  return {
    messages,
    isOpen,
    isTyping,
    isStreaming,
    input,
    setInput,
    sendMessage,
    clearChat,
    openChat,
    closeChat,
    toggleChat,
    hydrated,
  };
}
