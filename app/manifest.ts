import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andreas Ulvund - Frontend Developer Portfolio",
    short_name: "Andreas Ulvund",
    description:
      "Frontend developer specializing in React, Next.js, and TypeScript. View my portfolio of web development projects and get in touch.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["business", "portfolio", "developer"],
    lang: "en",
    dir: "ltr",
  };
}
