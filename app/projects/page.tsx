import ProjectGrid from "../components/ProjectGrid";
import { generateSEO } from "../utils/seo";

export const metadata = generateSEO({
  title: "Projects",
  description:
    "Explore Andreas Ulvund's React, Next.js, TypeScript and full-stack development projects.",
  path: "/projects",
});

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
      <ProjectGrid />
    </div>
  );
}
