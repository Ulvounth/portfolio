import { projects } from "../data/projects";

export const routes = [
  { path: "/", heading: /andreas ulvund/i },
  { path: "/about", heading: "About Me" },
  { path: "/projects", heading: "Projects" },
  { path: "/contact", heading: "Contact" },
  ...projects.map((project) => ({
    path: `/projects/${project.id}`,
    heading: project.title,
  })),
];

export const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;
