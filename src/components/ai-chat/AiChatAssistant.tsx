"use client";

import { usePathname } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";

export default function AiChatAssistant() {
  const pathname = usePathname();
  const {
    messages,
    isOpen,
    isTyping,
    isStreaming,
    input,
    setInput,
    sendMessage,
    clearChat,
    toggleChat,
    closeChat,
    hydrated,
  } = useChat();

  if (pathname.startsWith("/admin") || !hydrated) return null;

  return (
    <>
      <FloatingButton isOpen={isOpen} onClick={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        onClose={closeChat}
        messages={messages}
        isTyping={isTyping}
        isStreaming={isStreaming}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        clearChat={clearChat}
      />
    </>
  );
}
