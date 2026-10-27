import ContactClient from "./ContactClient";
import { generateSEO } from "../utils/seo";

export const metadata = generateSEO({
  title: "Contact",
  description:
    "Get in touch with Andreas Ulvund, a Junior Web Developer based in Spain seeking developer opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
