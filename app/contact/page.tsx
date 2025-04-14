// /app/contact/page.tsx

import ContactClient from "./ContactClient";

// Define metadata for the Contact page using the Metadata API.
export const metadata = {
  title: "Contact | Andreas Portfolio",
  description:
    "Get in touch with Andreas, a Front-end Developer based in Spain.",
  openGraph: {
    title: "Contact | Andreas Portfolio",
    description:
      "Get in touch with Andreas, a Front-end Developer based in Spain.",
    url: "https://andreasulvund.no/contact",
    images: [
      {
        url: "https://andreasulvund.no/images/andreas-bg.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Andreas Portfolio",
    description:
      "Get in touch with Andreas, a Front-end Developer based in Spain.",
    images: ["https://andreasulvund.no/images/andreas-bg.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
