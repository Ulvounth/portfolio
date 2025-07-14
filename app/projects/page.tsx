import ProjectCard from "../components/ProjectCard";
import projects from "../../data/projects.json";

export const metadata = {
  title: "Projects Portfolio - Andreas Ulvund Frontend Developer",
  description:
    "Explore Andreas Ulvund's portfolio of React, Next.js, and TypeScript projects. See real-world applications, code quality, and modern web development solutions.",
  keywords: [
    "Andreas Ulvund Projects",
    "React Projects Portfolio",
    "Next.js Applications",
    "TypeScript Projects",
    "Frontend Portfolio",
    "Web Development Projects",
    "JavaScript Applications",
    "Modern Web Apps",
  ],
  openGraph: {
    title: "Projects Portfolio - Andreas Ulvund",
    description:
      "Explore my portfolio of React, Next.js, and TypeScript projects showcasing modern web development.",
    url: "https://andreasulvund.no/projects",
    type: "website",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund Projects Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://andreasulvund.no/projects",
  },
};

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.images[0]}
            github={project.github}
            live={project.live}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}
