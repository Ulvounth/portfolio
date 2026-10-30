import Button from "@/components/ui/Button";
import type { Project } from "@/data/projects";

export default function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.github, text: "GitHub Repo", variant: "primary" },
    { href: project.live, text: "Live Site", variant: "secondary" },
  ] as const;
  return (
    <nav className="flex flex-wrap gap-3" aria-label={`${project.title} links`}>
      {links.map(
        (link) =>
          link.href && (
            <Button
              key={link.text}
              href={link.href}
              variant={link.variant}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
              <span className="sr-only">
                {" "}
                for {project.title} (opens in new tab)
              </span>
            </Button>
          ),
      )}
    </nav>
  );
}
