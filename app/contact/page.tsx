import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import { generateSEO } from "@/lib/seo";
import { navLabel, site } from "@/data/site";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "./ContactForm";

export const metadata = generateSEO({
  title: "Contact",
  description: `Get in touch with ${site.name}, a ${site.title} based in ${site.location} seeking developer opportunities.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: navLabel("/contact"), href: "/contact" }]}
      />
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
        <header>
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
            Contact Me
          </h1>
        </header>

        <div className="flex flex-col md:flex-row md:space-x-8 w-full max-w-4xl">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Get in Touch
            </h2>
            <p className="text-foreground mb-4">
              Feel free to reach out if you have any questions or opportunities.
            </p>
            <address className="text-foreground not-italic">
              <div className="mb-2">
                <strong>Email:</strong>{" "}
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
              </div>
              <div className="mb-2">
                <strong>Phone:</strong>{" "}
                <TextLink href={`tel:${site.phone}`}>
                  {site.phoneDisplay}
                </TextLink>
              </div>
              <div className="mb-2">
                <strong>Location:</strong> {site.location}
              </div>
            </address>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Find me on
              </h3>
              <nav className="flex space-x-4" aria-label="Social media links">
                <Button
                  href={site.social.github}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span className="sr-only"> (opens in new tab)</span>
                </Button>
                <Button
                  href={site.social.linkedin}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span className="sr-only"> (opens in new tab)</span>
                </Button>
              </nav>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
