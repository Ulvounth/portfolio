import About from "./components/About";
import Skills from "./components/Skills";
import dynamic from "next/dynamic";

// Lazy load components that are below the fold
const Portfolio = dynamic(() => import("./components/Portfolio"), {
  loading: () => (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse text-gray-400">Loading projects...</div>
    </div>
  ),
});

const Experience = dynamic(() => import("./components/Experience"), {
  loading: () => (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse text-gray-400">Loading experience...</div>
    </div>
  ),
});

export const metadata = {
  title: "Andreas Ulvund Portfolio - Full-Stack Developer",
  description:
    "Welcome to Andreas Ulvund's portfolio - Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, and databases. Based in Spain, creating modern web applications from front-end to back-end with clean code and great user experience. View my projects, skills, and contact information.",
  keywords: [
    "Andreas Ulvund Portfolio",
    "Andreas Ulvund",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer Spain",
    "JavaScript Developer",
    "Portfolio Website",
    "Developer Portfolio",
    "Full Stack Developer",
  ],
  openGraph: {
    title: "Andreas Ulvund Portfolio - Full-Stack Developer",
    description:
      "Welcome to Andreas Ulvund's portfolio. Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, and databases. Based in Spain, creating modern web applications with exceptional user experiences.",
    url: "https://andreasulvund.no",
    type: "website",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund Portfolio - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Ulvund Portfolio - Full-Stack Developer",
    description:
      "Full-Stack Developer Portfolio specializing in React, Next.js, TypeScript, Node.js, and databases. Based in Spain.",
    images: ["https://andreasulvund.no/images/andreas-bg.png"],
  },
  alternates: {
    canonical: "https://andreasulvund.no",
  },
};

export default function HomePage() {
  return (
    <main>
      <About />
      <Skills />
      <Portfolio />
      <Experience />
    </main>
  );
}
