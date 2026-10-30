"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Button from "@/components/ui/Button";
import { fieldClasses } from "@/components/ui/fieldStyles";
import {
  contactHoneypotField,
  contactLimits,
  validateContact,
} from "@/lib/contact";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Hidden field that only bots fill in. Real visitors never see it.
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = performance.now();
  }, []);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const input = validateContact(formData);
    if (!input.success) {
      setErrorMessage(input.error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input.data,
          [contactHoneypotField]: honeypot,
          elapsedMs: Math.round(performance.now() - startedAt.current),
        }),
        signal: AbortSignal.timeout(15000),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSuccessMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        startedAt.current = performance.now();
      } else {
        setErrorMessage(
          result?.message ||
            "There was an error sending your message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2">
      {successMessage && (
        <div
          role="status"
          className="text-success mb-4 p-3 bg-surface rounded-md border border-success"
        >
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="text-danger mb-4 p-3 bg-surface rounded-md border border-danger"
        >
          {errorMessage}
        </div>
      )}

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        aria-label="Contact form"
      >
        <div>
          <label className="block text-foreground mb-1" htmlFor="name">
            Name{" "}
            <span className="text-danger" aria-label="required">
              *
            </span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${fieldClasses} rounded-md`}
            autoComplete="name"
            minLength={contactLimits.name.min}
            maxLength={contactLimits.name.max}
            disabled={loading}
            placeholder="Your Name"
            required
            aria-describedby="name-help"
          />
          <div id="name-help" className="sr-only">
            Enter your full name
          </div>
        </div>
        <div>
          <label className="block text-foreground mb-1" htmlFor="email">
            Email{" "}
            <span className="text-danger" aria-label="required">
              *
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${fieldClasses} rounded-md`}
            autoComplete="email"
            maxLength={contactLimits.email.max}
            disabled={loading}
            placeholder="Your Email"
            required
            aria-describedby="email-help"
          />
          <div id="email-help" className="sr-only">
            Enter your email address
          </div>
        </div>
        <div>
          <label className="block text-foreground mb-1" htmlFor="message">
            Message{" "}
            <span className="text-danger" aria-label="required">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${fieldClasses} h-32 rounded-md`}
            minLength={contactLimits.message.min}
            maxLength={contactLimits.message.max}
            disabled={loading}
            placeholder="Your Message"
            required
            aria-describedby="message-help"
          ></textarea>
          <div id="message-help" className="sr-only">
            Enter your message or inquiry
          </div>
        </div>
        <div aria-hidden="true" className="absolute -left-[10000px]">
          <label htmlFor={contactHoneypotField}>Leave this field empty</label>
          <input
            type="text"
            id={contactHoneypotField}
            name={contactHoneypotField}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={loading} aria-describedby="submit-help">
          {loading ? "Sending..." : "Send Message"}
        </Button>
        <div id="submit-help" className="sr-only">
          {loading
            ? "Please wait while your message is being sent"
            : "Click to send your message"}
        </div>
      </form>
    </div>
  );
}
