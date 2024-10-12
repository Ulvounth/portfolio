import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Andreas Portfolio",
  description: "Portfolio of Andreas, a Front-end Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
