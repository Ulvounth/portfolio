import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  personJsonLd,
  projectJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

describe("structured data", () => {
  it("describes the person and the website from site data", () => {
    expect(personJsonLd()).toMatchObject({
      "@type": "Person",
      name: site.name,
      url: site.url,
    });
    expect(websiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      url: site.url,
      inLanguage: "en",
      publisher: { name: site.name },
    });
  });

  it("starts the breadcrumb list at Home and numbers items from 1", () => {
    const data = breadcrumbJsonLd([
      { label: "Projects", href: "/projects" },
      { label: "Holidaze", href: "/projects/holidaze" },
    ]);
    expect(data.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${site.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Holidaze",
        item: `${site.url}/projects/holidaze`,
      },
    ]);
  });

  it.each(projects.map((project) => [project.title, project] as const))(
    "describes %s as source code with absolute URLs",
    (_title, project) => {
      const data = projectJsonLd(project);
      expect(data["@type"]).toBe("SoftwareSourceCode");
      expect(data.url).toBe(`${site.url}/projects/${project.id}`);
      expect(data.image).toBe(`${site.url}${project.images[0]}`);
      expect(data.codeRepository).toBe(project.github);
      expect(data.keywords).toBe(project.tags.join(", "));
    },
  );

  it("escapes '<' so text cannot close the script element", () => {
    const json = serializeJsonLd({ name: "</script><b>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><b>" });
  });
});
