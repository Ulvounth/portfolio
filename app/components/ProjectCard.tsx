import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectLinks from "./ProjectLinks";
import ProjectTags from "./ProjectTags";

export default function ProjectCard({
  project,
  headingLevel = 2,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <article className="bg-background p-2 border border-white border-solid rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-blue-500 flex flex-col h-full">
      <Link
        href={`/projects/${project.id}`}
        className="block flex-grow p-4"
        aria-label={`View details for ${project.title} project`}
      >
        <div className="relative w-full h-48 md:h-64 lg:h-72 mb-4">
          <Image
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <Heading className="text-xl font-semibold text-foreground">
          {project.title}
        </Heading>
        <p className="text-gray-300 mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-4">
          <ProjectTags tags={project.tags} />
        </div>
      </Link>
      <div className="p-4 pt-0">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
