import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import JsonLd from "./components/JsonLd";
import { generateSEO } from "@/lib/seo";
import { websiteJsonLd } from "@/lib/structured-data";
import { site } from "@/data/site";

export const metadata = generateSEO({
  title: `${site.name} – ${site.title}`,
  description: site.description,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <Skills />
      <Portfolio />
      <Experience />
    </>
  );
}
