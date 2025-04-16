import { notFound } from "next/navigation";
import projects from "../../../data/projects.json";
import ProjectImageModal from "@/app/components/ProjectImageModal";

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
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">{project.title}</h1>

      <div className="mx-auto mb-12">
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex space-x-2 mb-8">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <a
            href={project.github}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primaryDark transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
          {project.live && (
            <a
              href={project.live}
              className="px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryDark transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site
            </a>
          )}
        </div>
      </div>

      {/* Replace plain image grid with the modal component */}
      <ProjectImageModal images={project.images} title={project.title} />
    </div>
  );
}
