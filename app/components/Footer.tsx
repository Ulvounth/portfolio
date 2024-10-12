import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

const Footer = () => (
  <footer className="text-gray-300 border-t">
    <div className="container mx-auto px-4 py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} Andreas Ulvund. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6">
        <a
          href="https://github.com/Ulvounth"
          className="text-gray-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
          className="text-gray-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href="https://www.facebook.com/andywolfdog"
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
