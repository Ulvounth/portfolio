import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: "1",
      title: "WithLive",
      description: "Has a site",
      images: [],
      github: "https://github.com/example/with-live",
      live: "https://with-live.example",
      tags: ["Next.js"],
    },
    {
      id: "2",
      title: "NoLive",
      description: "Code only",
      images: [],
      github: "https://github.com/example/no-live",
      tags: ["Node"],
    },
  ],
}));
import { systemPrompt } from "@/lib/server/chat-prompt";

describe("system prompt", () => {
  it("lists the live URL only for projects that have one", () => {
    expect(systemPrompt).toContain("**Live**: https://with-live.example");
    expect(systemPrompt).not.toContain("undefined");
    expect(systemPrompt.match(/\*\*Live\*\*/g)).toHaveLength(1);
  });
});
