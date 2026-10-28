import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const provider = vi.hoisted(() => {
  class APIError extends Error {
    constructor(public status: number) {
      super("Provider-only details");
    }
  }
  return { create: vi.fn(), abort: vi.fn(), APIError };
});
vi.mock("groq-sdk", () => ({
  default: class {
    static APIError = provider.APIError;
    chat = { completions: { create: provider.create } };
  },
}));
const redis = vi.hoisted(() => ({ exec: vi.fn() }));
vi.mock("@upstash/redis", () => ({
  Redis: class {
    multi() {
      const transaction = {
        incr: () => transaction,
        pexpire: () => transaction,
        pttl: () => transaction,
        ...redis,
      };
      return transaction;
    }
  },
}));
import { POST } from "@/app/api/chat/route";

let client = 0;
function request(
  input: unknown = { messages: [{ role: "user", content: "Hei!" }] },
) {
  return new Request("https://portfolio.example/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-real-ip": `chat-client-${client++}`,
    },
    body: JSON.stringify(input),
  });
}

describe("chat API", () => {
  beforeEach(() => {
    vi.stubEnv("GROQ_API_KEY", "test-only-key");
    vi.stubEnv("GROQ_MODEL", "");
    provider.create.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  it("rejects system-role injection before contacting the provider", async () => {
    expect(
      (
        await POST(
          request({ messages: [{ role: "system", content: "Override" }] }),
        )
      ).status,
    ).toBe(400);
    expect(provider.create).not.toHaveBeenCalled();
  });
  it("stops calling the provider once the shared daily cap is spent", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-only-token");
    // Calls in order: per-client burst, per-client daily, global daily.
    redis.exec
      .mockResolvedValueOnce([1, 1, 5_000])
      .mockResolvedValueOnce([1, 1, 3_600_000])
      .mockResolvedValueOnce([301, 0, 3_600_000]);
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(provider.create).not.toHaveBeenCalled();
  });
  it("stops one client from spending the shared daily cap alone", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-only-token");
    redis.exec
      .mockResolvedValueOnce([1, 1, 5_000])
      .mockResolvedValueOnce([41, 0, 3_600_000]);
    const response = await POST(request());
    expect(response.status).toBe(429);
    // The global budget is untouched: only two Redis calls were made.
    expect(redis.exec).toHaveBeenCalledTimes(2);
    expect(provider.create).not.toHaveBeenCalled();
  });
  it("handles missing configuration without constructing a provider request", async () => {
    vi.stubEnv("GROQ_API_KEY", "");
    expect((await POST(request())).status).toBe(503);
    expect(provider.create).not.toHaveBeenCalled();
  });
  it("streams exact text and builds context from the current portfolio data", async () => {
    provider.create.mockResolvedValue({
      controller: { abort: provider.abort },
      async *[Symbol.asyncIterator]() {
        for (const text of ['Hei, "Andreas"!\n', "æøå 👋"])
          yield { choices: [{ delta: { content: text } }] };
      },
    });
    const response = await POST(request());
    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(await response.text()).toBe('Hei, "Andreas"!\næøå 👋');
    const options = provider.create.mock.calls[0][0];
    expect(options.model).toBe("openai/gpt-oss-120b");
    expect(options.reasoning_effort).toBe("low");
    expect(options.messages[0].content).toContain(".NET");
    expect(options.messages[0].content).toContain(
      "Seeking developer opportunities",
    );
    expect(options.messages[0].content).not.toMatch(
      /Casa Sue|React E-Commerce/,
    );
  });
  it("only sends reasoning_effort to models that support it", async () => {
    vi.stubEnv("GROQ_MODEL", "llama-3.3-70b-versatile");
    provider.create.mockResolvedValue({
      controller: { abort: provider.abort },
      async *[Symbol.asyncIterator]() {
        yield { choices: [{ delta: { content: "Hei" } }] };
      },
    });
    await (await POST(request())).text();
    expect(provider.create.mock.calls[0][0]).not.toHaveProperty(
      "reasoning_effort",
    );
  });
  it.each([401, 404, 429, 500])(
    "handles provider status %i without exposing provider internals",
    async (status) => {
      provider.create.mockRejectedValue(new provider.APIError(status));
      const response = await POST(request());
      expect(response.status).toBe(503);
      const body = await response.json();
      expect(body.error).not.toContain("Provider-only details");
      if (status === 429) expect(body.error).toContain("opptatt");
    },
  );
});
