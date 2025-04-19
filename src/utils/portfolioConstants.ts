export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    title: "SageZaugg.com",
    description: "The website you're looking at right now.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "Tsparticles",
    ],
    imageUrl: "/assets/projects/project-sagezaugg.com.png",
    link: "/blog/0",
    githubLink: "https://github.com/sagezaugg/sagezaugg.com",
  },
];
