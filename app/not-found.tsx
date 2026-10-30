import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-muted mb-8">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button href="/" size="lg" className="min-w-max">
          Go to the home page
        </Button>
        <TextLink href="/projects">See my projects</TextLink>
      </div>
    </div>
  );
}
