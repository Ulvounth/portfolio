// app/projects/[projectId]/page.tsx

import { notFound } from "next/navigation";
import projects from "../../../data/projects.json";
import Image from "next/image";

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <p className="text-foreground mb-4">{project.description}</p>
      <div className="flex space-x-4">
        <a
          href={project.github}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        {project.live && (
          <a
            href={project.live}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondaryDark transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Site
          </a>
        )}
      </div>
    </div>
  );
}
