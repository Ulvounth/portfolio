import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { about } from "@/data/about";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { navigation, navLabel, site } from "@/data/site";
import { skills } from "@/data/skills";

const publicFile = (path: string) => join(process.cwd(), "public", path);

function expectUnique(values: readonly string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("site data", () => {
  it("has valid absolute URLs", () => {
    for (const url of [site.url, ...Object.values(site.social)]) {
      expect(new URL(url).protocol).toBe("https:");
    }
  });

  it("has a plausible email and phone number", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(site.phone).toMatch(/^\+\d{8,15}$/);
    expect(site.phoneDisplay.replace(/\s/g, "")).toBe(site.phone);
  });

  it("points to files that exist in public/", () => {
    expect(existsSync(publicFile(site.cv))).toBe(true);
    expect(existsSync(publicFile(site.image))).toBe(true);
  });

  it("has a valid last-updated date", () => {
    expect(site.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(new Date(site.updatedAt).getTime())).toBe(false);
  });

  it("has unique navigation entries with root-relative links", () => {
    expectUnique(navigation.map((link) => link.href));
    for (const link of navigation) {
      expect(link.href).toMatch(/^\/[a-z-]*$/);
      expect(link.label.trim()).not.toBe("");
    }
  });

  it("has an intro without empty or duplicate paragraphs", () => {
    expect(site.intro.length).toBeGreaterThan(0);
    for (const paragraph of site.intro) {
      expect(paragraph.trim()).not.toBe("");
    }
    expectUnique(site.intro);
  });

  it("resolves navigation labels and falls back to the path", () => {
    expect(navLabel("/projects")).toBe("Projects");
    expect(navLabel("/unknown")).toBe("/unknown");
  });
});

describe("about page content", () => {
  it("has no empty or duplicate text", () => {
    const text = [
      ...about.intro,
      about.studies.text,
      ...about.studies.items,
      ...about.story,
    ];
    for (const entry of text) {
      expect(entry.trim()).not.toBe("");
    }
    expectUnique(text);
  });
});

describe("projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique ids that are safe in URLs", () => {
    expectUnique(projects.map((project) => project.id));
    for (const project of projects) {
      expect(project.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it.each(projects.map((project) => [project.title, project] as const))(
    "%s is complete",
    (_title, project) => {
      expect(project.title.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.tags.length).toBeGreaterThan(0);
      expectUnique(project.tags);
      expect(project.images.length).toBeGreaterThan(0);
      expect(new URL(project.github).protocol).toBe("https:");
      if (project.live) expect(new URL(project.live).protocol).toBe("https:");
      for (const image of project.images) {
        expect(existsSync(publicFile(image)), image).toBe(true);
      }
    },
  );
});

describe("skills", () => {
  it("has unique names and icons that exist in public/", () => {
    expectUnique(skills.map((skill) => skill.name));
    for (const skill of skills) {
      expect(existsSync(publicFile(skill.src)), skill.src).toBe(true);
    }
  });
});

describe("experience", () => {
  it("has unique ids and no empty fields", () => {
    expectUnique(experience.map((item) => item.id));
    for (const item of experience) {
      expect(item.title.trim()).not.toBe("");
      expect(item.period.trim()).not.toBe("");
      expect(item.description.trim()).not.toBe("");
    }
  });

  it("marks at most one entry as current", () => {
    expect(
      experience.filter((item) => item.current).length,
    ).toBeLessThanOrEqual(1);
  });
});
