import { generateSEO } from "@/lib/seo";
import { navLabel, site } from "@/data/site";
import Breadcrumbs from "../components/Breadcrumbs";
import ProjectGrid from "../components/ProjectGrid";

export const metadata = generateSEO({
  title: "Projects",
  description: `Explore ${site.name}'s React, Next.js, TypeScript and full-stack development projects.`,
  path: "/projects",
});

export default function Projects() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: navLabel("/projects"), href: "/projects" }]}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
        <ProjectGrid />
      </div>
    </>
  );
}
