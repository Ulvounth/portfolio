import Image from "next/image";
import { generateSEO } from "../utils/seo";
import { site } from "@/data/site";

export const metadata = generateSEO({
  title: "About",
  description: site.description,
  path: "/about",
});

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-10 text-foreground text-center">
        About Me
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
            <Image
              src="/images/andreas-bg.png"
              alt="Andreas"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-foreground text-lg leading-relaxed">
            Hi, I&apos;m Andreas! I&apos;m originally from Norway but currently
            living in Spain, where I&apos;m building my career as a full-stack
            developer. After completing my front-end studies in 2024, I&apos;ve
            gained solid experience with HTML, CSS, JavaScript, React,
            TypeScript, and Next.js.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            I&apos;ve also completed my Backend Development studies at Noroff,
            building skills in server-side development with .NET, Node.js,
            Express, databases, REST APIs, and deployment. My studies covered:
          </p>
          <ul className="list-disc list-inside text-foreground text-lg leading-relaxed mt-2 ml-4">
            <li>Programming Foundations</li>
            <li>Front-End Technologies</li>
            <li>Programming with Objects</li>
            <li>Project Methodology</li>
            <li>JavaScript Servers (Node.js, Express)</li>
            <li>.NET</li>
            <li>Databases (SQL, MongoDB)</li>
            <li>REST APIs</li>
            <li>Server Deployment</li>
          </ul>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            I&apos;m currently looking for a developer role where I can
            contribute and continue learning. Alongside my job search, I&apos;m
            independently exploring AI, especially how to use AI tools
            effectively and how context engineering can give models useful
            instructions, context, and examples.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            Between October and December 2024, I did a two-month internship at
            Frakt24. I got to work on designing their new app in Figma and dove
            into their codebase with Laravel and PHP. It was a great experience
            working with a real team, using tools like Jira, Google Meet, and
            HubSpot daily.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            When I&apos;m not coding, I&apos;m usually checking out the latest
            tech and gadgets. I also love playing football, hitting the golf
            course, or diving into a good video game.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            Want to know more about my work experience? Check out my{" "}
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primaryDark transition-colors"
            >
              LinkedIn profile
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
