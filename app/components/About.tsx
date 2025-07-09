import React from "react";
import Link from "next/link";
import Image from "next/image";
import CVDownload from "./CVDownload";

const About: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto my-16 px-4 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 h-full flex flex-col justify-center  space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            ANDREAS ULVUND
          </h1>
          <h2 className="text-xl md:text-4xl font-semibold">
            FRONTEND DEVELOPER
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-md">
            I implement user interface design and solve user problems with
            modern web technologies. Let&apos;s build something great together.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
            <Link
              href="/contact"
              className="bg-white text-background px-6 py-3 rounded-full hover:bg-primaryDark hover:text-white transition-colors text-center inline-flex items-center justify-center min-w-max"
            >
              Contact Me
            </Link>
            <CVDownload />
          </div>
        </div>

        <div className="md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
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
      </div>
    </div>
  );
};

export default About;
