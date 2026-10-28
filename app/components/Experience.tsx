import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { experience } from "@/data/experience";

const connector = "h-full w-1 justify-self-center border-0 bg-gray-200";

// One grid per entry: line above, icon, line below in the middle column and the
// text beside it. From md the text alternates sides; below md it sits to the right.
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
        className="flex flex-col"
        aria-label="Education and professional experience, most recent first"
      >
        {experience.map((entry, index) => (
          <li
            key={entry.id}
            className="relative grid grid-cols-[0_auto_minmax(0,1fr)] grid-rows-[0.5rem_auto_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
          >
            {index > 0 && (
              <hr
                aria-hidden="true"
                className={`${connector} col-start-2 row-start-1 rounded-b-full`}
              />
            )}
            <div className="col-start-2 row-start-2" aria-hidden="true">
              {entry.current ? (
                <span className="block h-4 w-4 rounded-full bg-secondary" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
            </div>
            <article
              className={`col-start-3 row-span-3 row-start-1 m-1 mb-10 self-center justify-self-start ${
                index % 2 === 0
                  ? "md:text-start"
                  : "md:col-start-1 md:col-end-2 md:justify-self-end md:text-end"
              }`}
            >
              <p className="font-mono italic">{entry.period}</p>
              <h3 className="text-lg font-black">{entry.title}</h3>
              <p>{entry.description}</p>
            </article>
            {index < experience.length - 1 && (
              <hr
                aria-hidden="true"
                className={`${connector} col-start-2 row-start-3 rounded-t-full`}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
