import { describe, expect, it } from "vitest";
import { readChatStream } from "@/lib/chat";

describe("chat response stream", () => {
  it("preserves UTF-8, quotes and line breaks when every byte arrives separately", async () => {
    const expected = 'Hei, "Andreas"!\n.NET: æøå 👋';
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const byte of new TextEncoder().encode(expected))
          controller.enqueue(Uint8Array.of(byte));
        controller.close();
      },
    });
    let actual = "";
    for await (const text of readChatStream(stream)) actual += text;
    expect(actual).toBe(expected);
    expect(stream.locked).toBe(false);
  });
  it("propagates transport failures and releases its reader", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(new Error("Connection lost"));
      },
    });
    await expect(
      (async () => {
        for await (const text of readChatStream(stream)) void text;
      })(),
    ).rejects.toThrow("Connection lost");
    expect(stream.locked).toBe(false);
  });
});
