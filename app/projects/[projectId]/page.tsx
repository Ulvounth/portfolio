import { notFound } from "next/navigation";
import { Metadata } from "next";
import projects from "../../../data/projects.json";
import ProjectImageModal from "@/app/components/ProjectImageModal";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

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

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-8">{project.title}</h1>
      </header>

      <div className="mx-auto mb-12">
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          {project.description}
        </p>

        <div
          className="flex flex-wrap gap-2 mb-8"
          role="list"
          aria-label="Technologies used in this project"
        >
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        <nav className="flex space-x-4" aria-label="Project links">
          <a
            href={project.github}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primaryDark transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
          >
            GitHub Repo
          </a>
          {project.live && (
            <a
              href={project.live}
              className="px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryDark transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live website (opens in new tab)`}
            >
              Live Site
            </a>
          )}
        </nav>
      </div>

      {/* Replace plain image grid with the modal component */}
      <ProjectImageModal images={project.images} title={project.title} />
    </div>
  );
}
