// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        primaryDark: "#2563EB",
        secondary: "#9333EA",
        secondaryDark: "#7E22CE",
        accent: "#F59E0B",
        background: "rgb(34 35 41)", // Dark background
        foreground: "#F9FAFB", // Light text color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
