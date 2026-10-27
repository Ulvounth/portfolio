import ProjectGrid from "./ProjectGrid";

export default function Portfolio() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="portfolio-heading"
    >
      <h2 id="portfolio-heading" className="text-3xl font-semibold mb-8">
        Projects
      </h2>
      <ProjectGrid headingLevel={3} />
    </section>
  );
}
