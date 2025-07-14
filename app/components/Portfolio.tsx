import React from "react";

import ProjectCard from "../components/ProjectCard";
import projects from "../../data/projects.json";

const Portfolio: React.FC = () => {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="portfolio-heading"
    >
      <h2 id="portfolio-heading" className="text-3xl font-semibold">
        Projects
      </h2>
      <div
        className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8"
        role="list"
        aria-label="Featured projects portfolio"
      >
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
    </section>
  );
};

export default Portfolio;
