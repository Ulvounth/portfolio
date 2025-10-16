/* eslint-disable react/no-unescaped-entities */

import type { NextPage } from "next";

const Experience: NextPage = () => {
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
        role="list"
        aria-label="Professional experience timeline in chronological order"
      >
        {/* Backend Development at Noroff */}
        <li role="listitem">
          <div className="timeline-middle" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-yellow-500"
              aria-label="In progress"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <article className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic" dateTime="2024-10">
              Oct 2024 - Present
            </time>
            <h3 className="text-lg font-black">
              Backend Development (Year 2), Noroff School of Technology and
              Digital Media
            </h3>
            <p>
              Currently in the second year of Backend Development studies,
              building on a strong foundation from year one which covered
              Programming Foundations, Front-End Technologies, Programming with
              Objects, Project Methodology, JavaScript Servers, Databases, REST
              APIs, and Server Deployment. Continuing to expand expertise in
              server-side technologies and full-stack development.
            </p>
          </article>
          <hr aria-hidden="true" />
        </li>

        {/* Internship at Frakt24 */}
        <li role="listitem">
          <hr aria-hidden="true" />
          <div className="timeline-middle" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
              aria-label="Completed"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <article className="timeline-end mb-10 md:text-start">
            <time className="font-mono italic" dateTime="2024-10-21/2024-12-18">
              21 Oct 2024 - 18 Dec 2024
            </time>
            <h3 className="text-lg font-black">Intern, Frakt24</h3>
            <p>
              Completed a two-month internship at Frakt24, where I helped design
              their new app using Figma and gained hands-on experience with
              their codebase using Laravel and PHP. Collaborated using tools
              such as Jira, Google Meet, Google Chat, and HubSpot, gaining
              valuable insight into real-world team environments.
            </p>
          </article>
          <hr aria-hidden="true" />
        </li>

        {/* Front-End Developer at Noroff */}
        <li role="listitem">
          <hr aria-hidden="true" />
          <div className="timeline-middle" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
              aria-label="Completed"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <article className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic" dateTime="2021/2024">
              2021 - 2024
            </time>
            <h3 className="text-lg font-black">
              Front-End Developer, Noroff School of Technology and Digital Media
            </h3>
            <p>
              Three years of focused experience in front-end development, with
              thorough knowledge of HTML, CSS, JavaScript, React, TypeScript,
              and Next.js. Gained expertise in building advanced web
              applications using CSS frameworks like Bootstrap and Tailwind,
              along with tools such as Adobe XD and Figma.
            </p>
          </article>
          <hr aria-hidden="true" />
        </li>

        {/* Industry Worker at Hydro Aluminium Sunndal */}
        <li role="listitem">
          <hr aria-hidden="true" />
          <div className="timeline-middle" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-500"
              aria-label="Completed"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <article className="timeline-end mb-10 md:text-start">
            <time className="font-mono italic" dateTime="2013-09/2021-05">
              Sep 2013 - May 2021
            </time>
            <h3 className="text-lg font-black">
              Industry Worker, Hydro Aluminium Sunndal
            </h3>
            <p>
              Engaged in various metallurgical process tasks, focusing heavily
              on teamwork in an industrial environment. This role reinforced
              skills in collaborative working environments and industrial
              operations.
            </p>
          </article>
        </li>
      </ul>
    </section>
  );
};

export default Experience;
