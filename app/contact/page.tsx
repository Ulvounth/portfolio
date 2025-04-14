// /app/contact/page.tsx

import ContactClient from "./ContactClient";

// Define metadata for the Contact page using the Metadata API.
export const metadata = {
  title: "Contact | Andreas",
  description:
    "Get in touch with Andreas, a Front-end Developer based in Spain.",
};

export default function ContactPage() {
  return <ContactClient />;
}
