import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage = "/images/andreas-bg.png",
  canonicalUrl,
  noIndex = false,
}: SEOProps): Metadata {
  const siteName = "Andreas Ulvund Portfolio";
  const siteUrl = "https://andreasulvund.no";
  const fullTitle = `${title} | ${siteName}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Andreas Ulvund", url: siteUrl }],
    creator: "Andreas Ulvund",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl || siteUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || siteUrl,
      siteName,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullOgImage],
      creator: "@andreasulvund",
    },
    verification: {
      google: "googlef288ab6595c59e39",
      yandex: "your-yandex-verification-code",
    },
    category: "technology",
  };
}

// Common keywords for your portfolio
export const commonKeywords = [
  "Andreas Ulvund",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "JavaScript",
  "Web Development",
  "Portfolio",
  "Spain",
  "Noroff",
  "Full Stack Developer",
];
