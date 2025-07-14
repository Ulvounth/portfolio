import { notFound } from "next/navigation";
import { Metadata } from "next";
import projects from "../../../data/projects.json";
import ProjectImageModal from "@/app/components/ProjectImageModal";

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.projectId);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const projectImage =
    project.images && project.images.length > 0
      ? `https://andreasulvund.no${project.images[0]}`
      : "https://andreasulvund.no/images/andreas-bg.png";

  return {
    title: `${project.title} - Andreas Ulvund Project`,
    description: `${project.description} Built with ${project.tags.join(
      ", "
    )} by Andreas Ulvund, Frontend Developer.`,
    keywords: [
      project.title,
      "Andreas Ulvund",
      "Project Portfolio",
      ...project.tags,
      "Frontend Development",
      "Web Development",
    ],
    openGraph: {
      title: `${project.title} - Andreas Ulvund`,
      description: project.description,
      url: `https://andreasulvund.no/projects/${project.id}`,
      type: "website",
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Andreas Ulvund Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Andreas Ulvund`,
      description: project.description,
      images: [projectImage],
    },
    alternates: {
      canonical: `https://andreasulvund.no/projects/${project.id}`,
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

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

        <div className="flex flex-wrap gap-2 mb-8">
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
