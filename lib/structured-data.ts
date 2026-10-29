import type { Project } from "@/data/projects";
import { absoluteUrl, site } from "@/data/site";
import { skills } from "@/data/skills";

const context = "https://schema.org";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Referenced by name and URL from the other blocks.
const author = { "@type": "Person", name: site.name, url: site.url } as const;

export function personJsonLd() {
  return {
    "@context": context,
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: site.description,
    url: site.url,
    image: absoluteUrl(site.image),
    address: { "@type": "PostalAddress", addressCountry: site.countryCode },
    knowsAbout: skills.map((skill) => skill.name),
    sameAs: [site.social.github, site.social.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@context": context,
    "@type": "WebSite",
    name: `${site.name} Portfolio`,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author,
    publisher: author,
  };
}

// `items` is the trail below Home, the same list the visible breadcrumbs use.
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": context,
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.id}`),
    image: absoluteUrl(project.images[0]),
    keywords: project.tags.join(", "),
    codeRepository: project.github,
    author,
  };
}

// Escape "<" so project text can never close the script element.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
