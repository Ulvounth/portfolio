import type { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="border border-gray-300 p-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
