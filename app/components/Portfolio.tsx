import React from "react";

import ProjectCard from "../components/ProjectCard";
import projects from "../../data/projects.json";

const Portfolio: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.images[0]}
            github={project.github}
            live={project.live}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
