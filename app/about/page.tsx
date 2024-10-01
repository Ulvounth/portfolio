import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        [Your bio goes here.] Introduce yourself, talk about your background,
        skills, and what you are passionate about.
      </p>
    </div>
  );
};

export default About;
