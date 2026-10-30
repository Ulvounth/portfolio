"use client";

import "./globals.css";
import Button from "@/components/ui/Button";
import { inter, jetbrainsMono } from "./fonts";

// Replaces the root layout when it fails, so it needs its own document, styles and font.
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <title>Something went wrong</title>
        <main className="container mx-auto px-4 py-16 text-center" role="alert">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6">Please try loading this page again.</p>
          <Button onClick={() => retry()}>Try again</Button>
        </main>
      </body>
    </html>
  );
}
