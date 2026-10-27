import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChatMessage from "@/app/components/ChatMessage";

describe("assistant Markdown rendering", () => {
  it("renders lists, emphasis and readable links", () => {
    const html = renderToStaticMarkup(
      <ChatMessage
        content={
          "**Bakgrunn**\n\n- Ferdigutdannet\n- Jobbsøkende\n\n[Holidaze](/projects/1)"
        }
      />,
    );
    expect(html).toContain("<strong>Bakgrunn</strong>");
    expect(html).toContain("<ul");
    expect(html).toContain('href="/projects/1"');
    expect(html).not.toContain("**");
  });
  it("keeps external links in a new tab and internal links in-app", () => {
    const html = renderToStaticMarkup(
      <ChatMessage content="[Holidaze](/projects/1) [GitHub](https://github.com/Ulvounth) [Proto](//evil.example)" />,
    );
    expect(html).toContain('<a class="');
    expect(html).toMatch(/href="\/projects\/1"(?![^>]*target=)/);
    expect(html).toMatch(
      /href="https:\/\/github\.com\/Ulvounth"[^>]*target="_blank"/,
    );
    expect(html).toContain('<a href="//evil.example" class="');
  });
  it("blocks executable HTML, tracking images and script URLs", () => {
    const html = renderToStaticMarkup(
      <ChatMessage
        content={
          "<script>alert(1)</script>\n\n![tracker](https://example.com/image.png)\n\n[unsafe](javascript:alert(1))\n\n[GitHub](https://github.com/Ulvounth)"
        }
      />,
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
