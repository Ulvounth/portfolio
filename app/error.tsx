"use client";

import Button from "@/components/ui/Button";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <div className="container mx-auto px-4 py-16 text-center" role="alert">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6">Please try loading this page again.</p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
