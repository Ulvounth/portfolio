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
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        {project.title}
      </h1>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex justify-center space-x-2 mb-8">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-screen-lg mx-auto">
        {project.images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={imgSrc}
              alt={`${project.title} Image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
