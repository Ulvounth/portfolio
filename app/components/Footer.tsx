// components/Footer.tsx

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto px-4 py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} Andreas Ulvund. All rights reserved.
      </p>
      <div className="mt-4">
        <a
          href="https://github.com/Ulvounth"
          className="text-gray-400 hover:text-white mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
          className="text-gray-400 hover:text-white mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        {/* Add more social links as needed */}
      </div>
    </div>
  </footer>
);

export default Footer;
