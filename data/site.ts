export const site = {
  name: "Andreas Ulvund",
  title: "Junior Web Developer",
  url: "https://andreasulvund.no",
  description:
    "Junior Web Developer with completed front-end and backend studies at Noroff. Based in Spain, seeking developer opportunities and exploring practical AI and context engineering.",
  intro: [
    "I build modern web applications from front-end to back-end. Having completed my front-end and backend studies at Noroff, I'm now looking for a developer role.",
    "Alongside my job search, I'm exploring practical uses of AI and context engineering through independent learning.",
  ],
  image: "/images/andreas-bg.png",
  email: "contact@andreasulvund.no",
  phone: "+4798643191",
  phoneDisplay: "+47 98 64 31 91",
  location: "Torrevieja, Spain",
  updatedAt: "2026-10-27",
  cv: "/cv/CV_Andreas_ES.pdf",
  social: {
    github: "https://github.com/Ulvounth",
    linkedin: "https://www.linkedin.com/in/andreas-ulvund-98066376/",
    facebook: "https://www.facebook.com/andywolfdog",
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
