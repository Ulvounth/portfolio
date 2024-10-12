/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import type { NextPage } from "next";

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
            Hi, I'm Andreas! I'm originally from Norway, but now living in Spain
            where I've been diving deep into front-end development. I recently
            wrapped up my studies in front-end, mastering technologies like
            HTML, CSS, JavaScript, and React.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            Starting in October 2024, I'll be taking on a new challenge by
            studying back-end development. I'm excited to expand my skills and
            learn more about server-side technologies, databases, and APIs.
          </p>
          <p className="mt-4 text-foreground text-lg leading-relaxed">
            Outside of coding, I'm passionate about technology and always keen
            to explore the latest tools and gadgets. When I’m not at my desk,
            you'll likely find me playing football, enjoying a round of golf, or
            getting lost in a great video game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
