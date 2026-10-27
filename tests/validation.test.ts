import { describe, expect, it } from "vitest";
import { chatLimits, validateChat } from "@/lib/chat";
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
    { messages: Array.from({ length: 51 }, () => message) },
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
});
