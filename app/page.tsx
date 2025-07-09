import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";

export const metadata = {
  title: "Andreas Ulvund - Frontend Developer",
  description:
    "Andreas Ulvund - Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern web applications with clean code and great user experience.",
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
