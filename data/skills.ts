// Shown on the home page one group at a time, in this order.
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      {
        name: "HTML",
        src: "/skill-icons/icons8-html.svg",
        needsBackground: false,
      },
      {
        name: "CSS",
        src: "/skill-icons/icons8-css.svg",
        needsBackground: false,
      },
      {
        name: "JavaScript",
        src: "/skill-icons/icons8-javascript.svg",
        needsBackground: false,
      },
      {
        name: "TypeScript",
        src: "/skill-icons/icons8-typescript-48.png",
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
    ],
  },
  {
    id: "backend",
    title: "Backend and database",
    skills: [
      {
        name: "Node.js",
        src: "/skill-icons/nodejs.svg",
        needsBackground: false,
      },
      {
        name: "Express.js",
        src: "/skill-icons/icons8-express-js.svg",
        needsBackground: true,
      },
      {
        name: "REST API",
        src: "/skill-icons/icons8-rest-api.png",
        needsBackground: false,
      },
      {
        name: "SQL",
        src: "/skill-icons/icons8-sql-48.png",
        needsBackground: false,
      },
      {
        name: "PostgreSQL",
        src: "/skill-icons/postgresql.svg",
        needsBackground: false,
      },
      {
        name: "MongoDB",
        src: "/skill-icons/icons8-mongodb.svg",
        needsBackground: false,
      },
      {
        name: "Prisma",
        src: "/skill-icons/prisma.svg",
        needsBackground: false,
      },
      {
        name: "Supabase",
        src: "/skill-icons/supabase.svg",
        needsBackground: false,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools and testing",
    skills: [
      {
        name: "Git",
        src: "/skill-icons/icons8-git.svg",
        needsBackground: false,
      },
      {
        name: "Playwright",
        src: "/skill-icons/playwright.svg",
        needsBackground: true,
      },
      {
        name: "Docker",
        src: "/skill-icons/icons8-docker.svg",
        needsBackground: false,
      },
      {
        name: "AWS",
        src: "/skill-icons/icons8-aws.svg",
        needsBackground: true,
      },
      {
        name: "Azure",
        src: "/skill-icons/icons8-azure-48.png",
        needsBackground: false,
      },
      {
        name: "Figma",
        src: "/skill-icons/icons8-figma.svg",
        needsBackground: false,
      },
    ],
  },
];

export const skills = skillGroups.flatMap((group) => group.skills);
