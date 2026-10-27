import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  headingLevel = 2,
}: {
  headingLevel?: 2 | 3;
}) {
  return (
    <ul
      className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Projects"
    >
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
