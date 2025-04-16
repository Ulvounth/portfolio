/* eslint-disable react/no-unescaped-entities */

import type { NextPage } from "next";

const Experience: NextPage = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-foreground mb-12">Experience</h2>

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {/* Backend Development at Noroff */}
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Oct 2024</time>
            <div className="text-lg font-black">
              Backend Development, Noroff School of Technology and Digital Media
            </div>
            <p>
              Beginning studies in Backend Development starting in October 2024.
              These studies focus on back-end technologies, server-side
              programming, databases, and APIs, complementing the front-end
              skills previously acquired.
            </p>
          </div>
          <hr />
        </li>

        {/* Internship at Frakt24 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10 md:text-start">
            <time className="font-mono italic">21 Oct 2024 - 18 Dec 2024</time>
            <div className="text-lg font-black">Intern, Frakt24</div>
            <p>
              Completed a two-month internship at Frakt24, where I helped design
              their new app using Figma and gained hands-on experience with
              their codebase using Laravel and PHP. Collaborated using tools
              such as Jira, Google Meet, Google Chat, and HubSpot, gaining
              valuable insight into real-world team environments.
            </p>
          </div>
          <hr />
        </li>

        {/* Front-End Developer at Noroff */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2021 - 2024</time>
            <div className="text-lg font-black">
              Front-End Developer, Noroff School of Technology and Digital Media
            </div>
            <p>
              Three years of focused experience in front-end development, with
              thorough knowledge of HTML, CSS, JavaScript, React, TypeScript,
              and Next.js. Gained expertise in building advanced web
              applications using CSS frameworks like Bootstrap and Tailwind,
              along with tools such as Adobe XD and Figma.
            </p>
          </div>
          <hr />
        </li>

        {/* Industry Worker at Hydro Aluminium Sunndal */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10 md:text-start">
            <time className="font-mono italic">Sep 2013 - May 2021</time>
            <div className="text-lg font-black">
              Industry Worker, Hydro Aluminium Sunndal
            </div>
            <p>
              Engaged in various metallurgical process tasks, focusing heavily
              on teamwork in an industrial environment. This role reinforced
              skills in collaborative working environments and industrial
              operations.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Experience;
