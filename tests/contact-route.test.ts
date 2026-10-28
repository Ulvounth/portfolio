import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));
import { POST } from "@/app/api/contact/route";

const valid = {
  name: "Visitor",
  email: "visitor@example.com",
  message: "I'd like to discuss a developer opportunity.",
  ref_code: "",
  elapsedMs: 60_000,
};
let client = 0;
function request(input: unknown = valid) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-real-ip": `client-${client++}`,
    },
    body: JSON.stringify(input),
  });
}

describe("contact API", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-only-key");
    send.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  it("validates input before calling the email provider", async () => {
    expect((await POST(request({ ...valid, name: {} }))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("never reports success for a submission that fills the honeypot field", async () => {
    const response = await POST(request({ ...valid, ref_code: "autofilled" }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("email address"),
    });
    expect(send).not.toHaveBeenCalled();
  });
  it.each([
    ["too fast", { elapsedMs: 100 }],
    ["with a negative duration", { elapsedMs: -5 }],
    ["without a duration", { elapsedMs: undefined }],
    ["with a non-numeric duration", { elapsedMs: "60000" }],
  ])("rejects submissions sent %s", async (_, override) => {
    const response = await POST(request({ ...valid, ...override }));
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("returns an actionable error if email is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("LinkedIn"),
    });
    expect(send).not.toHaveBeenCalled();
  });
  it("does not report success when Resend resolves with an error", async () => {
    send.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "provider details" },
    });
    const response = await POST(request());
    expect(response.status).toBe(502);
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.message).not.toContain("provider details");
  });
  it("handles provider connection failures", async () => {
    send.mockRejectedValue(new Error("Connection lost"));
    expect((await POST(request())).status).toBe(502);
  });
  it("sends literal text and sets reply-to to the visitor without interpreting HTML", async () => {
    send.mockResolvedValue({ data: { id: "accepted-message" }, error: null });
    const response = await POST(
      request({
        ...valid,
        message: '<img src=x onerror="alert(1)">\nA literal message.',
      }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    const sent = send.mock.calls[0][0];
    expect(sent.replyTo).toBe(valid.email);
    expect(sent).not.toHaveProperty("html");
    expect(sent.text).toContain('<img src=x onerror="alert(1)">');
  });
  it("limits submissions and includes Retry-After", async () => {
    const makeRequest = () =>
      new Request("https://portfolio.example/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-real-ip": "limited-contact-client",
        },
        body: "{}",
      });
    for (let i = 0; i < 5; i++) await POST(makeRequest());
    const response = await POST(makeRequest());
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
  });
});
