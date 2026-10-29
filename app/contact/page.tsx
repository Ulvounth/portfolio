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
                <a
                  href={`mailto:${site.email}`}
                  className="text-yellow-500 hover:underline focus:outline-hidden focus:ring-2 focus:ring-yellow-500 rounded-sm"
                >
                  {site.email}
                </a>
              </div>
              <div className="mb-2">
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${site.phone}`}
                  className="text-yellow-500 hover:underline focus:outline-hidden focus:ring-2 focus:ring-yellow-500 rounded-sm"
                  aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
                >
                  {site.phoneDisplay}
                </a>
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
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-gray-700 border hover:text-white border-primary px-2 py-1 rounded-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  aria-label={`Visit ${site.name}'s GitHub profile (opens in new tab)`}
                >
                  GitHub
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:bg-gray-700 hover:text-white border border-secondary px-2 py-1 rounded-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-green-500"
                  aria-label={`Visit ${site.name}'s LinkedIn profile (opens in new tab)`}
                >
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
