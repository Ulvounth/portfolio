import { MetadataRoute } from "next";
import projects from "../data/projects.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://andreasulvund.no";

  // Static pages with specific last modified dates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2025-10-16"), // Updated today with performance optimizations
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-10-15"), // Updated with SEO improvements
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-10-15"), // Updated with accessibility improvements
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2025-10-16"), // Updated with Casa Sueño completion
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic project pages with individual dates
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified:
      project.id === "4"
        ? new Date("2025-10-15") // Casa Sueño completed yesterday
        : new Date("2025-09-01"), // Older projects
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
