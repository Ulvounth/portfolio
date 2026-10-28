import { expect, test } from "@playwright/test";
import { routes } from "./routes";

test.describe("security headers", () => {
  test("every response carries the hardening headers", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["strict-transport-security"]).toContain("max-age=");
    const csp = headers["content-security-policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  test("API responses carry the headers too", async ({ request }) => {
    const headers = (await request.post("/api/chat", { data: {} })).headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
  });
});

test.describe("content security policy", () => {
  for (const { path } of routes) {
    test(`${path} loads without CSP violations`, async ({ page }) => {
      const violations: string[] = [];
      page.on("console", (message) => {
        if (/content security policy/i.test(message.text()))
          violations.push(message.text());
      });
      await page.goto(path);
      await page
        .getByRole("button", { name: "Open chat with AI assistant" })
        .click();
      await expect(
        page.getByRole("dialog", { name: "Chat med Andreas AI" }),
      ).toBeVisible();
      expect(violations).toEqual([]);
    });
  }
});
