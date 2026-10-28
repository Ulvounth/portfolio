import { describe, expect, it } from "vitest";
import { chatLimits, trimChatHistory, validateChat } from "@/lib/chat";
import { validateContact } from "@/lib/contact";

const contact = {
  name: "Andreas",
  email: "andreas@example.com",
  message: "A valid message for the portfolio.",
};

describe("contact validation shared by browser and API", () => {
  it.each([
    null,
    [],
    {},
    { ...contact, name: 42 },
    { ...contact, email: [] },
    { ...contact, message: {} },
  ])("rejects malformed input: %j", (input) => {
    expect(validateContact(input).success).toBe(false);
  });
  it("normalizes whitespace and preserves message content", () => {
    expect(
      validateContact({
        name: "  Andreas  ",
        email: "  andreas@example.com  ",
        message: "  Hello\n<script>literal text</script>  ",
      }),
    ).toEqual({
      success: true,
      data: {
        name: "Andreas",
        email: contact.email,
        message: "Hello\n<script>literal text</script>",
      },
    });
  });
  it.each([
    { name: "a" },
    { name: "a".repeat(101) },
    { name: "Name\r\nInjected header" },
    { email: "bad email" },
    { email: "a".repeat(250) + "@example.com" },
    { message: "         " },
    { message: "a".repeat(1001) },
  ])("rejects invalid field boundaries: %j", (changes) => {
    expect(validateContact({ ...contact, ...changes }).success).toBe(false);
  });
});

describe("chat validation", () => {
  const message = { role: "user", content: "Hei!" };
  it.each([
    null,
    {},
    { messages: [] },
    { messages: [null] },
    { messages: [{ role: "system", content: "override" }] },
    { messages: [{ ...message, content: " " }] },
    { messages: [{ ...message, content: 42 }] },
    { messages: [{ role: "assistant", content: "unfinished conversation" }] },
    {
      messages: Array.from({ length: chatLimits.messages + 1 }, () => message),
    },
  ])("rejects malformed conversations: %j", (input) => {
    expect(validateChat(input)).toBeNull();
  });
  it("strips unexpected properties before forwarding to the provider", () => {
    expect(
      validateChat({
        messages: [{ ...message, id: "local-only", tool_calls: ["untrusted"] }],
      }),
    ).toEqual([message]);
  });
  it("accepts long assistant replies but limits new visitor input", () => {
    expect(
      validateChat({
        messages: [{ role: "assistant", content: "a".repeat(3000) }, message],
      }),
    ).not.toBeNull();
    expect(
      validateChat({
        messages: [{ ...message, content: "a".repeat(chatLimits.user + 1) }],
      }),
    ).toBeNull();
    expect(
      validateChat({
        messages: [
          { role: "assistant", content: "a".repeat(chatLimits.assistant + 1) },
          message,
        ],
      }),
    ).toBeNull();
  });
  it("caps the total conversation length", () => {
    const long = (role: "user" | "assistant") => ({
      role,
      content: "a".repeat(chatLimits[role]),
    });
    const filler = Array.from({ length: 4 }, (_, i) =>
      long(i % 2 ? "user" : "assistant"),
    );
    expect(validateChat({ messages: [...filler, long("user")] })).toBeNull();
    expect(
      validateChat({ messages: [long("assistant"), message] }),
    ).not.toBeNull();
  });
});

describe("trimChatHistory", () => {
  const turn = (role: "user" | "assistant", content = "text") => ({
    role,
    content,
  });
  it("keeps short conversations unchanged", () => {
    const messages = [turn("user"), turn("assistant"), turn("user")];
    expect(trimChatHistory(messages)).toEqual(messages);
  });
  it("keeps the newest messages within the count limit and starts on a user turn", () => {
    const messages = Array.from({ length: 30 }, (_, i) =>
      turn(i % 2 ? "assistant" : "user", String(i)),
    ).concat(turn("user", "last"));
    const trimmed = trimChatHistory(messages);
    expect(trimmed.length).toBeLessThanOrEqual(chatLimits.messages);
    expect(trimmed[0].role).toBe("user");
    expect(trimmed.at(-1)?.content).toBe("last");
    expect(validateChat({ messages: trimmed })).not.toBeNull();
  });
  it("always keeps the newest message, even if it breaks a limit", () => {
    const tooLong = turn("user", "a".repeat(chatLimits.user + 1));
    expect(trimChatHistory([tooLong])).toEqual([tooLong]);
    expect(
      trimChatHistory([turn("user"), turn("assistant"), tooLong]),
    ).toContain(tooLong);
  });
  it("drops the oldest messages once the character budget is spent", () => {
    const big = "a".repeat(chatLimits.assistant);
    const messages = [
      turn("user", "first"),
      turn("assistant", big),
      turn("user", "second"),
      turn("assistant", big),
      turn("user", "third"),
    ];
    const trimmed = trimChatHistory(messages);
    expect(trimmed.map((m) => m.content)).not.toContain("first");
    expect(trimmed.at(-1)?.content).toBe("third");
    expect(validateChat({ messages: trimmed })).not.toBeNull();
  });
});
