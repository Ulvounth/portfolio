// /app/contact/page.tsx

import ContactClient from "./ContactClient";

// Define metadata for the Contact page using the Metadata API.
export const metadata = {
  title: "Contact Andreas Ulvund - Frontend Developer",
  description:
    "Get in touch with Andreas Ulvund, a Frontend Developer based in Spain. Let's discuss your next project, collaboration opportunities, or React/Next.js development needs.",
  keywords: [
    "Contact Andreas Ulvund",
    "Hire Frontend Developer",
    "React Developer Contact",
    "Next.js Developer Spain",
    "Web Developer Collaboration",
    "Freelance Developer",
    "TypeScript Developer Contact",
  ],
  openGraph: {
    title: "Contact Andreas Ulvund - Frontend Developer",
    description:
      "Get in touch for React, Next.js, and TypeScript development projects. Based in Spain, available for collaboration.",
    url: "https://andreasulvund.no/contact",
    type: "website",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 1200,
        height: 630,
        alt: "Contact Andreas Ulvund",
      },
    ],
  },
  alternates: {
    canonical: "https://andreasulvund.no/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
