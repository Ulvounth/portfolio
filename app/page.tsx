import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";

export const metadata = {
  title: "Andreas Ulvund - Frontend Developer",
  description:
    "Andreas Ulvund - Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern web applications with clean code and great user experience.",
  keywords: [
    "Andreas Ulvund",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Spain",
    "JavaScript Developer",
    "Portfolio",
    "Full Stack Developer",
  ],
  openGraph: {
    title: "Andreas Ulvund - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern web applications.",
    url: "https://andreasulvund.no",
    type: "website",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Ulvund - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain.",
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
