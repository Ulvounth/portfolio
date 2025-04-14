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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(
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
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
        Contact Me
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-8 w-full max-w-4xl">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="text-foreground mb-4">
            Feel free to reach out if you have any questions or opportunities.
          </p>
          <ul className="text-foreground">
            <li className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ulvund_a@hotmail.com"
                className="text-yellow-500 hover:underline"
              >
                contact@andreasulvund.no
              </a>
            </li>
            <li className="mb-2">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+4798643191"
                className="text-yellow-500 hover:underline"
              >
                +47 98 64 31 91
              </a>
            </li>
            <li className="mb-2">
              <strong>Location:</strong> Benijófar, Spain
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Find me on
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ulvounth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-gray-700 border hover:text-white border-primary px-2 py-1 rounded transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:bg-gray-700 hover:text-white border border-secondary px-2 py-1 rounded transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          {successMessage && (
            <p role="alert" aria-live="polite" className="text-green-500 mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p role="alert" aria-live="assertive" className="text-red-500 mb-4">
              {errorMessage}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-foreground" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary text-foreground"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-foreground" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary text-foreground"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-foreground" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary h-32 text-foreground"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
