export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface SuggestedQuestion {
  label: string;
  prompt: string;
}

/** Swap this interface implementation to connect OpenAI / Gemini later. */
export interface ChatEngine {
  generateResponse: (
    message: string,
    history: ChatMessage[]
  ) => Promise<string>;
}
