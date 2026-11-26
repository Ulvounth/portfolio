import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import TextLink from "@/components/ui/TextLink";
import { generateSEO } from "@/lib/seo";
import { about } from "@/data/about";
import { navLabel, site } from "@/data/site";
import Breadcrumbs from "../components/Breadcrumbs";
import CVDownload from "../components/CVDownload";

export const metadata = generateSEO({
  title: "About",
  description: site.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: navLabel("/about"), href: "/about" }]} />
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24 grid gap-12 lg:grid-cols-[minmax(0,48rem)_20rem] lg:justify-between">
        <div className="space-y-8 md:space-y-10">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase">
            About Me
          </h1>

          <div className="space-y-4">
            {about.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg md:text-xl leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <section className="space-y-4" aria-labelledby="how-i-work-heading">
            <h2 id="how-i-work-heading" className="text-2xl font-semibold">
              {about.howIWork.heading}
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              {about.howIWork.text}
            </p>
          </section>

          <Card as="section" className="p-6" aria-labelledby="studies-heading">
            <h2 id="studies-heading" className="text-2xl font-semibold">
              Studies
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {about.studies.text}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.studies.items.map((study) => (
                <li key={study}>
                  <Tag>{study}</Tag>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-4">
            {about.story.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <p className="text-lg leading-relaxed text-muted">
              Want to know more about my work experience? Check out my{" "}
              <TextLink
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn profile
              </TextLink>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/contact" size="lg" className="min-w-max">
              Contact Me
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              See my projects
            </Button>
          </div>
        </div>

        <aside aria-labelledby="glance-heading" className="lg:pt-24">
          <Card className="p-6 lg:sticky lg:top-28">
            <h2 id="glance-heading" className="text-2xl font-semibold">
              At a glance
            </h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-mono text-sm text-muted">Role</dt>
                <dd>{site.title}</dd>
              </div>
              <div>
                <dt className="font-mono text-sm text-muted">Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-sm text-muted">Email</dt>
                <dd>
                  <TextLink href={`mailto:${site.email}`}>
                    {site.email}
                  </TextLink>
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <CVDownload />
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
