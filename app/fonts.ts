import { Inter } from "next/font/google";

// Shared by the root layout and global-error, which replaces the layout.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
