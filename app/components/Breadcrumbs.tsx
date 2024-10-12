"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname(); // For App Router
  const pathArray = pathname.split("/").filter((path) => path);

  // Hide breadcrumbs on the home page
  if (pathname === "/") {
    return null; // Don't render breadcrumbs on home page
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="breadcrumbs text-sm py-4 text-foreground">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline ">
              Home
            </Link>
          </li>
          {pathArray.map((path, index) => {
            const isLast = index === pathArray.length - 1;
            const href = "/" + pathArray.slice(0, index + 1).join("/");

            return (
              <li key={index} className="flex items-center space-x-2">
                <span>/</span>
                {isLast ? (
                  <span className="text-gray-400">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </span>
                ) : (
                  <Link href={href} className="hover:underline text-primary">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
