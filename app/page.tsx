import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";

export const metadata = {
  title: "Home | Andreas",
  description: "Welcome to the portfolio website of Andreas.",
};

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Full-screen hero section */}
      <div className="container h-dvh mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 h-full flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6">
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
          <Link
            href="/contact"
            className="mt-4 bg-white text-background px-6 py-2 rounded-full hover:bg-primaryDark hover:text-white transition-colors"
          >
            Contact Me
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/Andreas.jpg"
              alt="Andreas"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <Carousel />
      </div>
    </div>
  );
}
