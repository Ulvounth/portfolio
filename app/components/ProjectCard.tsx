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
}

const ProjectCard: FC<ProjectProps> = ({
  id,
  title,
  description,
  image,
  github,
  live,
}) => (
  <div className="bg-background p-2 border border-white border-solid shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-blue-500">
    {/* Make image and description area clickable */}
    <Link href={`/projects/${id}`} className="block">
      <div className="p-4">
        <div className="relative w-full h-48 md:h-64 lg:h-72">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-gray-300 mt-2">{description}</p>
        </div>
      </div>
    </Link>
    {/* Buttons */}
    <div className="p-4 pt-0 flex space-x-4">
      <a
        href={github}
        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      {live && (
        <a
          href={live}
          className="inline-block px-4 py-2 bg-secondary text-white rounded hover:bg-secondaryDark transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Site
        </a>
      )}
    </div>
  </div>
);

export default ProjectCard;
