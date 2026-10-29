import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { navLabel } from "@/data/site";
import { generateSEO } from "@/lib/seo";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ProjectImageModal from "@/app/components/ProjectImageModal";
import ProjectLinks from "@/app/components/ProjectLinks";
import ProjectTags from "@/app/components/ProjectTags";

type PageProps = { params: Promise<{ projectId: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = getProject((await params).projectId);
  if (!project) notFound();
  return generateSEO({
    title: project.title,
    description: project.description,
    path: `/projects/${project.id}`,
    image: project.images[0],
    keywords: project.tags,
  });
}

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export default async function ProjectPage({ params }: PageProps) {
  const project = getProject((await params).projectId);
  if (!project) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: navLabel("/projects"), href: "/projects" },
          { label: project.title, href: `/projects/${project.id}` },
        ]}
      />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">{project.title}</h1>
        <div className="mx-auto mb-12">
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="mb-8">
            <ProjectTags tags={project.tags} />
          </div>
          <ProjectLinks project={project} />
        </div>
        <ProjectImageModal images={project.images} title={project.title} />
      </div>
    </>
  );
}
