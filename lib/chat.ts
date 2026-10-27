export const chatLimits = {
  messages: 50,
  user: 2000,
  assistant: 12000,
} as const;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function validateChat(input: unknown): ChatMessage[] | null {
  if (!input || typeof input !== "object" || !("messages" in input))
    return null;
  const messages = input.messages;
  if (
    !Array.isArray(messages) ||
    !messages.length ||
    messages.length > chatLimits.messages
  )
    return null;
  const validated: ChatMessage[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object") return null;
    const { role, content } = message as Record<string, unknown>;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      !content.trim() ||
      content.length > chatLimits[role]
    )
      return null;
    validated.push({ role, content });
  }
  if (validated.at(-1)?.role !== "user") return null;
  return validated;
}

export async function* readChatStream(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      const text = decoder.decode(value, { stream: !done });
      if (text) yield text;
      if (done) break;
    }
  } finally {
    reader.releaseLock();
  }
}
