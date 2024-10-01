import type { NextPage } from "next";

export const metadata = {
  title: "Home | Andreas",
  description: "Welcome to the portfolio website of Andreas.",
};

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-700">
          I am a Front-end Developer specializing in building (and occasionally
          designing) exceptional digital experiences.
        </p>
      </div>
    </div>
  );
};

export default Home;
