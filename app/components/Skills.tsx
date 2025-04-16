import React from "react";
import Image from "next/image";

const skills = [
  { name: "HTML", src: "/skill-icons/icons8-html.svg" },
  { name: "CSS", src: "/skill-icons/icons8-css.svg" },
  { name: "JavaScript", src: "/skill-icons/icons8-javascript.svg" },
  { name: "React", src: "/skill-icons/icons8-react.svg" },
  { name: "Next.js", src: "/skill-icons/nextjs-icon-svgrepo-com.svg" },
  { name: "Tailwind", src: "/skill-icons/icons8-tailwind-css.svg" },
  { name: "Typescript", src: "/skill-icons/icons8-typescript-48.png" },
  { name: "Node.js", src: "/skill-icons/icons8-nodejs.svg" },
  { name: "Git", src: "/skill-icons/icons8-git.svg" },
  { name: "Jest", src: "/skill-icons/icons8-jest.png" },
  { name: "Figma", src: "/skill-icons/icons8-figma.svg" },
  { name: "Bootstrap", src: "/skill-icons/icons8-bootstrap.svg" },
  { name: "SQL", src: "/skill-icons/icons8-sql-48.png" },
  { name: "Express.js", src: "/skill-icons/icons8-express-js.svg" },
  { name: "MongoDB", src: "/skill-icons/icons8-mongodb.svg" },
];

const Skills: React.FC = () => {
  return (
    <section className=" container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold">My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center"
          >
            <Image src={skill.src} alt={skill.name} width={64} height={64} />
            <p className="mt-4 font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
