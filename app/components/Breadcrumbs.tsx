"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProject } from "@/data/projects";
import { navigation } from "@/data/site";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  if (pathname === "/") return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
      <div className="breadcrumbs text-sm py-4 text-foreground">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          {pathArray.map((path, index) => {
            const isLast = index === pathArray.length - 1;
            const href = "/" + pathArray.slice(0, index + 1).join("/");

            return (
              <li key={href} className="flex items-center space-x-2">
                <span aria-hidden="true">/</span>
                {isLast ? (
                  <span className="text-gray-400" aria-current="page">
                    {navigation.find((item) => item.href === href)?.label ||
                      (pathArray[0] === "projects"
                        ? getProject(path)?.title
                        : undefined) ||
                      path}
                  </span>
                ) : (
                  <Link href={href} className="hover:underline text-primary">
                    {navigation.find((item) => item.href === href)?.label ||
                      path}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
