"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container mx-auto px-4 py-16 text-center" role="alert">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6">Please try loading this page again.</p>
      <button
        onClick={reset}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark"
      >
        Try again
      </button>
    </div>
  );
}
