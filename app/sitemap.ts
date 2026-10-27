import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, navigation, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = navigation.map(({ href }) => ({
    url: absoluteUrl(href),
    lastModified: new Date(site.updatedAt),
    changeFrequency:
      href === "/" || href === "/projects" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
