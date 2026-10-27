import { describe, expect, it } from "vitest";
import { readJson } from "@/lib/server/request";

function request(body: string, headers: Record<string, string> = {}) {
  return new Request("https://example.com", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

describe("bounded JSON request parsing", () => {
  it("parses valid bodies", async () => {
    await expect(readJson(request('{"message":"Hei!"}'), 100)).resolves.toEqual(
      { message: "Hei!" },
    );
  });
  it("rejects malformed JSON and wrong content types", async () => {
    await expect(readJson(request("{"), 100)).rejects.toMatchObject({
      status: 400,
    });
    await expect(
      readJson(request("{}", { "content-type": "text/plain" }), 100),
    ).rejects.toMatchObject({ status: 415 });
  });
  it("measures actual UTF-8 bytes even when Content-Length is missing or misleading", async () => {
    const body = JSON.stringify({ message: "æøå👋".repeat(20) });
    await expect(
      readJson(request(body, { "content-length": "1" }), 100),
    ).rejects.toMatchObject({ status: 413 });
    await expect(
      readJson(request("{}", { "content-length": "1000" }), 100),
    ).rejects.toMatchObject({ status: 413 });
  });
});
