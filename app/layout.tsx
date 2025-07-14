import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import Script from "next/script";

export const metadata = {
  title: {
    default: "Andreas Ulvund - Frontend Developer Portfolio",
    template: "%s | Andreas Ulvund",
  },
  description:
    "Andreas Ulvund - Experienced Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain, creating modern, performant web applications with exceptional user experiences.",
  keywords: [
    "Andreas Ulvund",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Spain",
    "JavaScript Developer",
    "Full Stack Developer",
    "Modern Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Andreas Ulvund", url: "https://andreasulvund.no" }],
  creator: "Andreas Ulvund",
  openGraph: {
    title: "Andreas Ulvund - Frontend Developer Portfolio",
    description:
      "Experienced Frontend Developer specializing in React, Next.js, and TypeScript. Creating modern web applications in Spain.",
    url: "https://andreasulvund.no",
    siteName: "Andreas Ulvund Portfolio",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Andreas Ulvund - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Ulvund - Frontend Developer Portfolio",
    description:
      "Experienced Frontend Developer specializing in React, Next.js, and TypeScript. Based in Spain.",
    images: ["https://andreasulvund.no/images/andreas-bg.png"],
    creator: "@andreasulvund",
  },
  alternates: {
    canonical: "https://andreasulvund.no",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "f288ab6595c59e39",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andreas Ulvund",
    jobTitle: "Frontend Developer",
    description:
      "Experienced Frontend Developer specializing in React, Next.js, and TypeScript",
    url: "https://andreasulvund.no",
    image: "https://andreasulvund.no/images/andreas-bg.png",
    address: {
      "@type": "Place",
      addressCountry: "Spain",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Frontend Development",
      "Web Development",
    ],
    sameAs: [
      "https://github.com/Ulvounth",
      "https://www.linkedin.com/in/andreas-ulvund-98066376/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };

  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className="flex-grow">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
