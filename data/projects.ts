import projectData from "./projects.json";

export interface Project {
  id: string;
  // Former numeric id; next.config.mjs redirects /projects/<legacyId> to the slug.
  legacyId?: string;
  title: string;
  description: string;
  images: string[];
  github: string;
  live?: string;
  tags: string[];
}

export const projects: readonly Project[] = projectData;

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
