import type { Project } from "@/data/projects";

export default function ProjectLinks({ project }: { project: Project }) {
  const links = [
    {
      href: project.github,
      text: "GitHub Repo",
      label: `View ${project.title} source code on GitHub`,
      color: "bg-primary hover:bg-primaryDark",
    },
    {
      href: project.live,
      text: "Live Site",
      label: `View ${project.title} live website`,
      color: "bg-secondary hover:bg-secondaryDark",
    },
  ];
  return (
    <nav className="flex flex-wrap gap-3" aria-label={`${project.title} links`}>
      {links
        .filter((link) => link.href)
        .map((link) => (
          <a
            key={link.text}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in new tab)`}
            className={`inline-block px-4 py-2 text-white rounded-sm transition-colors ${link.color}`}
          >
            {link.text}
          </a>
        ))}
    </nav>
  );
}
