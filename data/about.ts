// Content of the /about page, in the order it is shown: intro, studies, story.
export const about = {
  intro: [
    "Hi, I'm Andreas! I'm originally from Norway but currently living in Spain, where I'm building my career as a full-stack developer. After completing my front-end studies in 2024, I've gained solid experience with HTML, CSS, JavaScript, React, TypeScript, and Next.js.",
  ],
  // `text` introduces `items`, so the two always belong together.
  studies: {
    text: "I've also completed my Backend Development studies at Noroff, building skills in server-side development with .NET, Node.js, Express, databases, REST APIs, and deployment. My studies covered:",
    items: [
      "Programming Foundations",
      "Front-End Technologies",
      "Programming with Objects",
      "Project Methodology",
      "JavaScript Servers (Node.js, Express)",
      ".NET",
      "Databases (SQL, MongoDB)",
      "REST APIs",
      "Server Deployment",
    ],
  },
  story: [
    "I'm currently looking for a developer role where I can contribute and continue learning. Alongside my job search, I'm independently exploring AI, especially how to use AI tools effectively and how context engineering can give models useful instructions, context, and examples.",
    "Between October and December 2024, I did a two-month internship at Frakt24. I got to work on designing their new app in Figma and dove into their codebase with Laravel and PHP. It was a great experience working with a real team, using tools like Jira, Google Meet, and HubSpot daily.",
    "When I'm not coding, I'm usually checking out the latest tech and gadgets. I also love playing football, hitting the golf course, or diving into a good video game.",
  ],
} as const;
