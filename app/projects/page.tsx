import type { NextPage } from "next";
import ProjectCard from "../components/ProjectCard";
import projects from "../../data/projects.json";

const Projects: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            github={project.github}
            live={project.live}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
