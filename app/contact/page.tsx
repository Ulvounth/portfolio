// app/contact/page.tsx

import type { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
        Contact Me
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Contact Information */}
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
                href="mailto:youremail@example.com"
                className="text-primary hover:underline"
              >
                youremail@example.com
              </a>
            </li>
            <li className="mb-2">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +1 234 567 890
              </a>
            </li>
            <li className="mb-2">
              <strong>Location:</strong> Your City, Your Country
            </li>
          </ul>
          {/* Social Media Links */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Find me on
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                LinkedIn
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2">
          <form className="space-y-4">
            <div>
              <label className="block text-foreground">Name</label>
              <input
                type="text"
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary text-foreground"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-foreground">Email</label>
              <input
                type="email"
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary text-foreground"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-foreground">Message</label>
              <textarea
                className="w-full border border-gray-600 bg-background p-2 rounded focus:outline-none focus:border-primary h-32 text-foreground"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
