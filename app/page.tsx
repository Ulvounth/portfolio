// app/page.tsx

import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";

export const metadata = {
  title: "Home | Andreas",
  description: "Welcome to the portfolio website of Andreas.",
};

export default function Home() {
  return (
    <div>
      {/* Full-screen section */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Image Section */}
        <div className="md:w-1/2 h-1/2 md:h-full flex items-center justify-center bg-background">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <Image
              src="/images/Andreas.jpg"
              alt="Andreas"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        {/* Text Section */}
        <div className="md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center md:items-start px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Hi, I am Andreas
          </h1>
          <p className="text-lg md:text-2xl text-foreground mb-6 max-w-lg">
            Front-end Developer specializing in modern web technologies.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primaryDark transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8">
        <Carousel />
      </div>
    </div>
  );
}
