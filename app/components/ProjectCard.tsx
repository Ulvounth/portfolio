import Image from "next/image";
import { FC } from "react";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  github: string;
  live?: string;
}

const ProjectCard: FC<ProjectProps> = ({
  title,
  description,
  image,
  github,
  live,
}) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="relative w-full h-64 md:h-80 lg:h-96">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    </div>

    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4">
        <a
          href={github}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        {live && (
          <>
            <span className="mx-2">|</span>
            <a
              href={live}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site
            </a>
          </>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
