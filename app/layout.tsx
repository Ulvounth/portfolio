import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { site } from "@/data/site";
import { openGraphDefaults, twitterDefaults } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";
import JsonLd from "./components/JsonLd";
import { inter } from "./fonts";

// Canonical URL and share image are set per page (lib/seo.ts and the
// opengraph-image file), so nothing here may claim a canonical for every route.
export const metadata: Metadata = {
  title: {
    default: `${site.name} – ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  verification: { google: "f288ab6595c59e39" },
  openGraph: openGraphDefaults,
  twitter: twitterDefaults,
};

export const viewport: Viewport = { themeColor: site.themeColor };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <JsonLd data={personJsonLd()} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
