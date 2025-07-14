"use client";

import { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 5000); // clear after 5 seconds
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("All fields are required");
      setLoading(false);
      clearMessages();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(
          result.message ||
            "There was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
      clearMessages();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
          Contact Me
        </h1>
      </header>

      <div className="flex flex-col md:flex-row md:space-x-8 w-full max-w-4xl">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="text-foreground mb-4">
            Feel free to reach out if you have any questions or opportunities.
          </p>
          <address className="text-foreground not-italic">
            <div className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@andreasulvund.no"
                className="text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
                aria-label="Send email to Andreas"
              >
                contact@andreasulvund.no
              </a>
            </div>
            <div className="mb-2">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+4798643191"
                className="text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
                aria-label="Call Andreas at +47 98 64 31 91"
              >
                +47 98 64 31 91
              </a>
            </div>
            <div className="mb-2">
              <strong>Location:</strong> Torrevieja, Spain
            </div>
          </address>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Find me on
            </h3>
            <nav className="flex space-x-4" aria-label="Social media links">
              <a
                href="https://github.com/Ulvounth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-gray-700 border hover:text-white border-primary px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Visit Andreas's GitHub profile (opens in new tab)"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:bg-gray-700 hover:text-white border border-secondary px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Visit Andreas's LinkedIn profile (opens in new tab)"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="md:w-1/2">
          {successMessage && (
            <div
              role="alert"
              aria-live="polite"
              className="text-green-500 mb-4 p-3 bg-green-100 rounded border border-green-300"
            >
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="text-red-500 mb-4 p-3 bg-red-100 rounded border border-red-300"
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
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-500 text-foreground"
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
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-500 text-foreground"
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
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-500 h-32 text-foreground"
                placeholder="Your Message"
                required
                aria-describedby="message-help"
              ></textarea>
              <div id="message-help" className="sr-only">
                Enter your message or inquiry
              </div>
            </div>
            <button
              type="submit"
              className={`bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              aria-describedby="submit-help"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            <div id="submit-help" className="sr-only">
              {loading
                ? "Please wait while your message is being sent"
                : "Click to send your message"}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
