import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
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
    <Card
      as="article"
      interactive
      className="relative p-2 overflow-hidden flex flex-col h-full"
    >
      <div className="grow p-4">
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
          {/* The link is the title, and its ::after stretches over the whole card. */}
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-hidden focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="text-muted mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-4">
          <ProjectTags tags={project.tags} />
        </div>
      </div>
      <div className="relative z-10 p-4 pt-0">
        <ProjectLinks project={project} />
      </div>
    </Card>
  );
}
