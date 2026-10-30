import Link from "next/link";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/structured-data";
import JsonLd from "./JsonLd";

// `items` is the trail below Home; the last item is the current page.
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
        <div className="max-w-full overflow-x-auto text-sm py-4 text-foreground">
          <ul className="flex space-x-2 font-mono">
            <li>
              <Link href="/" className="text-accent hover:underline">
                Home
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center space-x-2">
                <span aria-hidden="true">/</span>
                {index === items.length - 1 ? (
                  <span className="text-muted" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:underline text-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
