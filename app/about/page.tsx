/* eslint-disable react/no-unescaped-entities */
// app/about/page.tsx

import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6 text-foreground">About Me</h1>
      <p className="text-foreground text-lg leading-relaxed">
        <strong>Hey there</strong>, I'm Andreas! Originally from Norway, but
        right now, I'm living in Spain and learning Front-end Development. When
        I'm not coding, I'm a big computer geek, always checking out new tech
        and software. I'm also a gamer, and I enjoy getting lost in virtual
        worlds and having exciting adventures. On the other hand, I'm also into
        real-life stuff, like football and golf. Whether it's watching an
        exciting game or playing a round of golf, these sports bring balance and
        excitement to my life. I'm a curious person who is into both digital and
        real-world things, and my journey into Front-end Development is pretty
        awesome.
      </p>
    </div>
  );
};

export default About;
