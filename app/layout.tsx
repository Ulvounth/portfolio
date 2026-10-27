import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import ChatBot from "./components/ChatBot";
import { generateSEO } from "./utils/seo";
import { absoluteUrl, site } from "@/data/site";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  ...generateSEO({
    title: `${site.name} Portfolio`,
    description: site.description,
  }),
  title: {
    default: `${site.name} – ${site.title}`,
    template: `%s | ${site.name}`,
  },
  metadataBase: new URL(site.url),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  verification: { google: "f288ab6595c59e39" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: site.description,
    url: site.url,
    image: absoluteUrl(site.image),
    address: { "@type": "PostalAddress", addressCountry: "ES" },
    knowsAbout: skills.map((skill) => skill.name),
    sameAs: [site.social.github, site.social.linkedin],
  };
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
