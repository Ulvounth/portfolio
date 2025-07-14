import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";

export const metadata = {
  title: "Andreas Ulvund Portfolio - Frontend Developer",
  description:
    "Welcome to Andreas Ulvund's portfolio - Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern web applications with clean code and great user experience. View my projects, skills, and contact information.",
  keywords: [
    "Andreas Ulvund Portfolio",
    "Andreas Ulvund",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Spain",
    "JavaScript Developer",
    "Portfolio Website",
    "Developer Portfolio",
    "Full Stack Developer",
    "Frontend Portfolio",
  ],
  openGraph: {
    title: "Andreas Ulvund Portfolio - Frontend Developer",
    description:
      "Welcome to Andreas Ulvund's portfolio. Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern web applications with exceptional user experiences.",
    url: "https://andreasulvund.no",
    type: "website",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund Portfolio - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Ulvund Portfolio - Frontend Developer",
    description:
      "Frontend Developer Portfolio specializing in React, Next.js, and TypeScript. Based in Spain.",
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
