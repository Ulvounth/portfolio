export const chatLimits = {
  messages: 20,
  user: 2000,
  // Replies are capped at 2048 completion tokens, which is about 8,000 to 9,000
  // characters of English prose at most. Leave some room above that.
  assistant: 10000,
  // Characters across the whole conversation.
  total: 16000,
  // 16,000 characters can take 4 bytes each in UTF-8, plus JSON overhead.
  bodyBytes: 65_536,
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
  let total = 0;
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
    total += content.length;
    if (total > chatLimits.total) return null;
    validated.push({ role, content });
  }
  if (validated.at(-1)?.role !== "user") return null;
  return validated;
}

/**
 * Keeps the newest messages that fit the server limits, starting on a user turn.
 * The newest message is always kept, so the server can tell the visitor it is too long.
 */
export function trimChatHistory<T extends ChatMessage>(messages: T[]): T[] {
  let total = 0;
  let start = messages.length;
  while (start > 0 && messages.length - start < chatLimits.messages) {
    const { role, content } = messages[start - 1];
    total += content.length;
    const fits =
      content.length <= chatLimits[role] && total <= chatLimits.total;
    if (!fits && start < messages.length) break;
    start--;
  }
  while (start < messages.length && messages[start].role !== "user") start++;
  return messages.slice(start);
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
