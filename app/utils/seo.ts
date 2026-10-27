import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  // For titles that already contain the site name and must skip the layout template.
  absoluteTitle?: boolean;
}

// Let the root layout apply the title template exactly once.
export function generateSEO({
  title,
  description,
  path = "/",
  image = site.image,
  keywords,
  absoluteTitle = false,
}: SEOProps): Metadata {
  const url = absoluteUrl(path);
  // Image dimensions vary (project screenshots), so leave them for crawlers to read.
  const images = [{ url: absoluteUrl(image), alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${site.name} Portfolio`,
      images,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
