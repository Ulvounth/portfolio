// /app/contact/page.tsx

import ContactClient from "./ContactClient";

// Define metadata for the Contact page using the Metadata API.
export const metadata = {
  title: "Contact | Andreas Ulvund",
  description:
    "Get in touch with Andreas Ulvund, a Frontend Developer based in Spain. Let's discuss your next project or collaboration opportunities.",
};

export default function ContactPage() {
  return <ContactClient />;
}
