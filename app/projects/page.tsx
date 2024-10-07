// app/projects/page.tsx

import ProjectCard from "../components/ProjectCard";
import projects from "../../data/projects.json";

export const metadata = {
  title: "Projects | Andreas",
  description: "Projects by Andreas.",
};

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.images[0]} // Use the first image from the array
            github={project.github}
            live={project.live}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}
