import Image from "next/image";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import CVDownload from "./CVDownload";

export default function Hero() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto my-16 px-4 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 h-full flex flex-col justify-center  space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase">
            {site.name}
          </h1>
          <h2 className="text-xl md:text-4xl font-semibold uppercase">
            {site.title}
          </h2>
          {site.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base md:text-lg text-muted max-w-md"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/contact" size="lg" className="min-w-max">
              Contact Me
            </Button>
            <CVDownload />
          </div>
        </div>

        <div className="md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
          <div
            className="relative w-56 md:w-72 lg:w-80"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src="/images/andypic3.png"
              alt={`${site.name}, ${site.title} - Professional photo`}
              fill
              sizes="(max-width: 768px) 80vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              className="rounded-full shadow-2xl"
              preload
            />
          </div>
        </div>
      </div>
    </div>
  );
}
