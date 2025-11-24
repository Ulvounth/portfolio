import React from "react";
import Image from "next/image";

const skills = [
  { name: "HTML", src: "/skill-icons/icons8-html.svg", needsBackground: false },
  { name: "CSS", src: "/skill-icons/icons8-css.svg", needsBackground: false },
  {
    name: "JavaScript",
    src: "/skill-icons/icons8-javascript.svg",
    needsBackground: false,
  },
  {
    name: "React",
    src: "/skill-icons/icons8-react.svg",
    needsBackground: false,
  },
  {
    name: "Next.js",
    src: "/skill-icons/nextjs-icon-svgrepo-com.svg",
    needsBackground: true,
  },
  {
    name: "Tailwind",
    src: "/skill-icons/icons8-tailwind-css.svg",
    needsBackground: false,
  },
  {
    name: "Typescript",
    src: "/skill-icons/icons8-typescript-48.png",
    needsBackground: false,
  },
  {
    name: "Node.js",
    src: "/skill-icons/icons8-nodejs.svg",
    needsBackground: false,
  },
  { name: "Git", src: "/skill-icons/icons8-git.svg", needsBackground: false },
  { name: "Jest", src: "/skill-icons/icons8-jest.png", needsBackground: false },
  {
    name: "Figma",
    src: "/skill-icons/icons8-figma.svg",
    needsBackground: false,
  },
  { name: "AWS", src: "/skill-icons/icons8-aws.svg", needsBackground: true },
  {
    name: "Azure",
    src: "/skill-icons/icons8-azure-48.png",
    needsBackground: false,
  },
  {
    name: "Docker",
    src: "/skill-icons/icons8-docker.svg",
    needsBackground: false,
  },
  {
    name: "SQL",
    src: "/skill-icons/icons8-sql-48.png",
    needsBackground: false,
  },
  {
    name: "Express.js",
    src: "/skill-icons/icons8-express-js.svg",
    needsBackground: true,
  },
  {
    name: "MongoDB",
    src: "/skill-icons/icons8-mongodb.svg",
    needsBackground: false,
  },
  {
    name: "REST API",
    src: "/skill-icons/icons8-rest-api.png",
    needsBackground: false,
  },
];

const Skills: React.FC = () => {
  return (
    <section
      className=" container mx-auto px-4 py-8"
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
                className={skill.needsBackground ? "dark:invert-0" : ""}
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
};

export default Skills;
