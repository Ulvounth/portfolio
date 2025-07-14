/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import type { NextPage } from "next";

export const metadata = {
  title: "About Andreas Ulvund - Frontend Developer Story",
  description:
    "Learn about Andreas Ulvund, a passionate Frontend Developer based in Spain. Discover my journey, skills in React, Next.js, TypeScript, and commitment to creating exceptional web experiences.",
  keywords: [
    "About Andreas Ulvund",
    "Frontend Developer Spain",
    "React Developer Story",
    "Web Developer Background",
    "TypeScript Developer Experience",
    "Next.js Specialist",
    "Developer Journey",
  ],
  openGraph: {
    title: "About Andreas Ulvund - Frontend Developer Story",
    description:
      "Learn about Andreas Ulvund, a passionate Frontend Developer based in Spain specializing in React, Next.js, and TypeScript.",
    url: "https://andreasulvund.no/about",
    type: "profile",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund - About Me",
      },
    ],
  },
  alternates: {
    canonical: "https://andreasulvund.no/about",
  },
};

const About: NextPage = () => {
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
            Hi, I'm Andreas! Originally from Norway, I'm now living in Spain
            where I've been diving deep into front-end development. I recently
            wrapped up my studies in front-end, mastering technologies such as
            HTML, CSS, JavaScript, and React.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            In October 2024, I started my journey into back-end development. So
            far, I have learned:
          </p>
          <ul className="list-disc list-inside text-foreground text-lg leading-relaxed mt-2">
            <li>Programming with Objects</li>
            <li>JavaScript servers (Node.js, Express)</li>
            <li>Databases (SQL, MongoDB)</li>
          </ul>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            Soon, I'll expand my skills further by delving into REST APIs (which
            I already know some of from my front-end studies) and server
            deployment.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            I also recently completed a two-month internship at Frakt24. During
            this internship, I helped design their new app using Figma and
            gained hands-on experience with their codebase using Laravel and
            PHP. Working with tools such as Jira, Google Meet, Google Chat, and
            HubSpot, I gained valuable experience collaborating in a real-world
            team environment.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            When I'm not coding, I'm passionate about technology and love
            exploring the latest tools and gadgets. You'll often find me playing
            football, enjoying a round of golf, or getting lost in a great video
            game.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            For more information about my professional journey, feel free to
            check out my{" "}
            <a
              href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              LinkedIn profile
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
