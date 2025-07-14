import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live?: string;
  tags?: string[];
}

const ProjectCard: FC<ProjectProps> = ({
  id,
  title,
  description,
  image,
  github,
  live,
  tags = [],
}) => (
  <article className="bg-background p-2 border border-white border-solid rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-blue-500 flex flex-col">
    <div className="flex-grow">
      <Link
        href={`/projects/${id}`}
        className="block h-full"
        aria-label={`View details for ${title} project`}
      >
        <div className="p-4">
          <div className="relative w-full h-48 md:h-64 lg:h-72">
            <Image
              src={image}
              alt={`Screenshot of ${title} project showing the main interface and design`}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-gray-300 mt-2">{description}</p>
          </div>

          {tags.length > 0 && (
            <div
              className="mt-4 flex flex-wrap gap-2"
              role="list"
              aria-label="Technologies used"
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm border text-white rounded"
                  role="listitem"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>

    <div className="p-4 pt-0 flex  space-x-4">
      <a
        href={github}
        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title} source code on GitHub`}
      >
        GitHub Repo
      </a>
      {live && (
        <a
          href={live}
          className="inline-block px-4 py-2 bg-secondary text-white rounded hover:bg-secondaryDark transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} live website`}
        >
          Live Site
        </a>
      )}
    </div>
  </article>
);

export default ProjectCard;
