"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  RotateCcw,
  X,
} from "lucide-react";
import { PERSON } from "@/lib/site";
import { SUGGESTED_QUESTIONS } from "./KnowledgeBase";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import type { ChatMessage as ChatMessageType } from "./types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageType[];
  isTyping: boolean;
  isStreaming: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: (text: string) => void;
  clearChat: () => void;
};

function MessageSkeleton() {
  return (
    <div className="flex gap-2.5 animate-pulse">
      <div className="w-7 h-7 rounded-full bg-white/10 shrink-0" />
      <div className="flex-1 space-y-2 max-w-[75%]">
        <div className="h-3 bg-white/10 rounded-full w-full" />
        <div className="h-3 bg-white/10 rounded-full w-4/5" />
        <div className="h-3 bg-white/10 rounded-full w-3/5" />
      </div>
    </div>
  );
}

export default function ChatWindow({
  isOpen,
  onClose,
  messages,
  isTyping,
  isStreaming,
  input,
  setInput,
  sendMessage,
  clearChat,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("instant");
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (messages.some((m) => m.role === "user")) {
      setShowSuggestions(false);
    }
  }, [messages]);

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen || !panelRef.current) return;
      const target = e.target as Node;
      if (
        panelRef.current.contains(target) ||
        (target instanceof Element && target.closest(".ai-chat-fab"))
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping || isStreaming) return;
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const busy = isTyping || isStreaming;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[940] bg-black/40 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none"
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Ashish AI Portfolio Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed z-[960] flex flex-col overflow-hidden
              inset-x-3 bottom-[88px] top-auto max-h-[min(680px,calc(100vh-100px))]
              sm:inset-auto sm:bottom-6 sm:left-6 sm:top-auto
              sm:w-[400px] sm:h-[min(620px,calc(100vh-48px))]
              rounded-[20px] border border-white/10
              bg-[rgba(13,13,13,0.82)] backdrop-blur-2xl
              shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.65),0_0_40px_rgba(80,140,255,0.06)]"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 ring-2 ring-white/5">
                  <Image
                    src={PERSON.profileImage}
                    alt={PERSON.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0d0d0d]"
                  aria-label="Online"
                  title="Online"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-white tracking-tight">
                  Ask Ashish AI
                </h2>
                <p className="text-[11px] text-white/45 font-mono tracking-wide">
                  Portfolio Assistant
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat history"
                  className="p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  className="p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scroll ai-chat-scroll"
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isTyping && !messages.some((m) => m.isStreaming && m.content) && (
                <MessageSkeleton />
              )}
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <SuggestedQuestions
                questions={SUGGESTED_QUESTIONS}
                onSelect={(prompt) => sendMessage(prompt)}
                disabled={busy}
              />
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 p-3 border-t border-white/[0.08] bg-white/[0.02]"
            >
              <div className="flex items-end gap-2 rounded-[16px] border border-white/10 bg-white/[0.04] px-3 py-2 focus-within:border-white/20 focus-within:shadow-[0_0_20px_rgba(100,160,255,0.08)] transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Ashish..."
                  rows={1}
                  disabled={busy}
                  aria-label="Chat message input"
                  className="flex-1 resize-none bg-transparent text-[13px] text-white placeholder:text-white/35 outline-none max-h-24 py-1 leading-relaxed disabled:opacity-50"
                  style={{ minHeight: "24px" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                  className="shrink-0 p-2 rounded-xl bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-white/25 text-center mt-2 font-mono">
                Powered by Ashish AI · Local knowledge base
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
