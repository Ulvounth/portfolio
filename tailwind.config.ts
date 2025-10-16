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
        primary: "#4C51BF",
        primaryDark: "#434190",
        secondary: "#9333EA",
        secondaryDark: "#7E22CE",
        background: "#1A202C",
        foreground: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("daisyui"),
  ],
  daisyui: {
    themes: false, // Use our custom dark theme instead
    logs: false,
  },
};

export default config;
