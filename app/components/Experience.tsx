import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="text-4xl font-bold text-foreground mb-12"
      >
        Experience
      </h2>
      <ul
        className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        aria-label="Education and professional experience, most recent first"
      >
        {experience.map((entry, index) => (
          <li key={entry.id}>
            {index > 0 && <hr aria-hidden="true" />}
            <div className="timeline-middle" aria-hidden="true">
              {entry.current ? (
                <span className="block h-4 w-4 rounded-full bg-secondary" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
            </div>
            <article
              className={
                index % 2 === 0
                  ? "timeline-end mb-10 md:text-start"
                  : "timeline-start mb-10 md:text-end"
              }
            >
              <p className="font-mono italic">{entry.period}</p>
              <h3 className="text-lg font-black">{entry.title}</h3>
              <p>{entry.description}</p>
            </article>
            {index < experience.length - 1 && <hr aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </section>
  );
}
