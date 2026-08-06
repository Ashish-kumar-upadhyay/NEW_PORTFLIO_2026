"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Bot, Check, Copy, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "./types";

type Props = {
  message: ChatMessageType;
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1" aria-label="Ashish AI is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ChatMessage({ message }: Props) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isEmptyStreaming = message.isStreaming && !message.content;

  const handleCopy = async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
          isUser
            ? "bg-white/10 border-white/15"
            : "bg-gradient-to-br from-white/10 to-white/5 border-white/15"
        }`}
        aria-hidden
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white/70" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white/80" />
        )}
      </div>

      <div
        className={`relative group max-w-[85%] rounded-[16px] px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? "bg-white text-black rounded-br-[4px]"
            : "bg-white/[0.06] border border-white/[0.08] text-white/90 rounded-bl-[4px] backdrop-blur-sm"
        }`}
      >
        {isEmptyStreaming ? (
          <TypingIndicator />
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="ai-chat-markdown prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 last:mb-0 pl-4 list-disc space-y-0.5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 last:mb-0 pl-4 list-decimal space-y-0.5">{children}</ol>
                ),
                li: ({ children }) => <li className="text-white/85">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <code className="block bg-black/40 border border-white/10 rounded-lg px-3 py-2 my-2 text-[12px] font-mono text-emerald-300/90 overflow-x-auto custom-scroll">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="px-1 py-0.5 rounded bg-white/10 text-emerald-300/90 text-[12px] font-mono">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="my-2 overflow-x-auto custom-scroll">{children}</pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2 custom-scroll">
                    <table className="min-w-full text-[12px] border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-white/10 px-2 py-1 bg-white/5 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-white/10 px-2 py-1">{children}</td>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-bold mt-2 mb-1 text-white">{children}</h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {message.isStreaming && message.content && (
              <span
                className="inline-block w-[2px] h-[14px] ml-0.5 bg-white/60 animate-pulse align-middle"
                aria-hidden
              />
            )}
          </div>
        )}

        {!isUser && message.content && !message.isStreaming && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy message"
            className="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-white/60 hover:text-white"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
