import Image from "next/image";

import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="text-3xl font-semibold">
        My Skills
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8"
        role="list"
        aria-label="Technical skills and technologies"
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center"
            role="listitem"
          >
            <div
              className={`${
                skill.needsBackground ? "bg-white rounded-full p-3" : ""
              }`}
            >
              <Image
                src={skill.src}
                alt={`${skill.name} technology logo`}
                width={64}
                height={64}
                aria-hidden="true"
              />
            </div>
            <p
              className="mt-4 font-semibold"
              aria-label={`Skilled in ${skill.name}`}
            >
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
