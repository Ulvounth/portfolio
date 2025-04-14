import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import Script from "next/script";

export const metadata = {
  title: "Andreas Portfolio",
  description: "Portfolio of Andreas, a Front-end Developer based in Spain.",
  openGraph: {
    title: "Andreas Portfolio",
    description: "Portfolio of Andreas, a Front-end Developer.",
    url: "https://andreasulvund.no",
    siteName: "Andreas Portfolio",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andreas Portfolio",
    description: "Portfolio of Andreas, a Front-end Developer.",
    images: ["https://andreasulvund.no/images/andreas-bg.png"],
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
    url: "https://andreasulvund.no",
    sameAs: [
      "https://github.com/Ulvounth",
      "https://www.linkedin.com/in/andreas-ulvund-98066376/",
    ],
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
