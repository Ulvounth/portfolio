import Image from "next/image";

import Card from "@/components/ui/Card";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="text-3xl font-semibold">
        My Skills
      </h2>
      {skillGroups.map((group) => (
        <div key={group.id} className="mt-8">
          <h3
            id={`skills-${group.id}`}
            className="font-mono text-lg text-muted"
          >
            {group.title}
          </h3>
          <ul
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4"
            aria-labelledby={`skills-${group.id}`}
          >
            {group.skills.map((skill) => (
              <Card
                as="li"
                key={skill.name}
                className="p-6 flex flex-col items-center"
              >
                <div
                  className={
                    skill.needsBackground ? "bg-white rounded-full p-3" : ""
                  }
                >
                  {/* Decorative: the name below says the same. */}
                  <Image src={skill.src} alt="" width={64} height={64} />
                </div>
                <p className="mt-4 font-semibold">{skill.name}</p>
              </Card>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
