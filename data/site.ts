export const site = {
  name: "Andreas Ulvund",
  title: "Junior Full-Stack Developer",
  url: "https://andreasulvund.no",
  description:
    "Junior Full-Stack Developer at RoboConnect with front-end and backend studies from Noroff. Based in Spain, open to roles in Spain and Norway.",
  intro: [
    "I build modern web applications from front-end to back-end. I have completed front-end and backend studies at Noroff, and since April 2026 I have been working as a full-stack developer at RoboConnect.",
    "I'm looking for a junior developer role in Spain or Norway, and I'm able to relocate. I'm also exploring practical uses of AI and context engineering through independent learning.",
  ],
  image: "/images/andreas-bg.png",
  email: "contact@andreasulvund.no",
  phone: "+4798643191",
  phoneDisplay: "+47 98 64 31 91",
  location: "Torrevieja, Spain",
  countryCode: "ES",
  // Browser chrome, PWA and share-image colour. Keep in sync with
  // --color-background in app/globals.css (tests/data-integrity.test.ts checks it).
  themeColor: "#0D1117",
  updatedAt: "2026-11-26",
  cv: "/cv/CV_Andreas_ES.pdf",
  social: {
    github: "https://github.com/Ulvounth",
    linkedin: "https://www.linkedin.com/in/andreas-ulvund-98066376/",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function navLabel(href: string) {
  return navigation.find((item) => item.href === href)?.label ?? href;
}

export function absoluteUrl(path: string = "/") {
  return new URL(path, site.url).toString();
}
