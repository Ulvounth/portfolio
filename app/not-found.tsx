import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-gray-300 mb-8">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-white text-background px-6 py-3 rounded-full hover:bg-primaryDark hover:text-white transition-colors text-center inline-flex items-center justify-center min-w-max"
        >
          Go to the home page
        </Link>
        <Link href="/projects" className="underline hover:text-primary">
          See my projects
        </Link>
      </div>
    </div>
  );
}
