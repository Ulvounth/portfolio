// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4C51BF", // A nice purple-blue color
        primaryDark: "#434190", // Darker shade of purple-blue
        secondary: "#9333EA",
        secondaryDark: "#7E22CE",
        background: "#1A202C", // Darker background color
        foreground: "#E2E8F0", // Light foreground color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
