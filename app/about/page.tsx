import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { about } from "@/data/about";
import { navLabel, site } from "@/data/site";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata = generateSEO({
  title: "About",
  description: site.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: navLabel("/about"), href: "/about" }]} />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-10 text-foreground text-center">
          About Me
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
              <Image
                src="/images/andreas-bg.png"
                alt={site.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                style={{ objectFit: "cover" }}
                preload
              />
            </div>
          </div>

          <div>
            {about.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-foreground text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-4 text-foreground text-lg leading-relaxed">
              {about.studies.text}
            </p>
            <ul className="list-disc list-inside text-foreground text-lg leading-relaxed mt-2 ml-4">
              {about.studies.items.map((study) => (
                <li key={study}>{study}</li>
              ))}
            </ul>
            {about.story.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-foreground text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
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
    </>
  );
}
