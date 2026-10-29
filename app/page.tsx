import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import { generateSEO } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = generateSEO({
  title: `${site.name} – ${site.title}`,
  description: site.description,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <Portfolio />
      <Experience />
    </>
  );
}
