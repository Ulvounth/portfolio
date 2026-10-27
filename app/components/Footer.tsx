import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { site } from "@/data/site";

const Footer = () => (
  <footer className="text-gray-300 border-t">
    <div className="container mx-auto px-4 py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6">
        <a
          href={site.social.github}
          aria-label="GitHub (opens in new tab)"
          className="text-gray-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>

        <a
          href={site.social.linkedin}
          aria-label="LinkedIn (opens in new tab)"
          className="text-gray-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href={site.social.facebook}
          aria-label="Facebook (opens in new tab)"
          className="text-gray-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
