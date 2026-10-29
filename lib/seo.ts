import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  // Without an image, the generated app/opengraph-image is used.
  image?: string;
  keywords?: string[];
  // For titles that already contain the site name and must skip the layout template.
  absoluteTitle?: boolean;
}

// The generated share image. app/opengraph-image.tsx takes its size from here;
// the route is named after that file (e2e/seo.spec.ts checks the URL and size).
export const shareImage = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
} as const;

// Site-wide defaults. The root layout uses them for pages without their own
// metadata (404, errors); generateSEO repeats them because a page's openGraph
// and twitter objects replace the layout's instead of merging with it.
export const openGraphDefaults = {
  siteName: `${site.name} Portfolio`,
  type: "website",
  locale: "en_US",
} as const;
export const twitterDefaults = { card: "summary_large_image" } as const;

// Let the root layout apply the title template exactly once.
export function generateSEO({
  title,
  description,
  path = "/",
  image,
  keywords,
  absoluteTitle = false,
}: SEOProps): Metadata {
  const url = absoluteUrl(path);
  // A page's own openGraph replaces the one inherited from the layout, including
  // the file-based image, so the generated image has to be named here too.
  // Project screenshots vary in size, so their dimensions are left for crawlers.
  const images = [
    image
      ? { url: absoluteUrl(image), alt: title }
      : {
          url: absoluteUrl(shareImage.path),
          width: shareImage.width,
          height: shareImage.height,
          alt: title,
        },
  ];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { ...openGraphDefaults, title, description, url, images },
    twitter: { ...twitterDefaults, title, description, images },
  };
}
