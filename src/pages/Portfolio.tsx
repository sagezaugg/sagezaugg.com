import React from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "A brief description of your first project and its impact.",
    technologies: ["React", "TypeScript", "Node.js"],
    imageUrl: "/placeholder1.jpg",
    link: "#",
  },
  {
    title: "Project 2",
    description: "A brief description of your second project and its impact.",
    technologies: ["Python", "Django", "PostgreSQL"],
    imageUrl: "/placeholder2.jpg",
    link: "#",
  },
  {
    title: "Project 3",
    description: "A brief description of your third project and its impact.",
    technologies: ["Vue.js", "Firebase", "TailwindCSS"],
    imageUrl: "/placeholder3.jpg",
    link: "#",
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        My Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="project-card"
          >
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zelda-dark/80 to-transparent" />
            </div>

            <h3 className="text-2xl font-serif text-zelda-gold mb-2">
              {project.title}
            </h3>

            <p className="text-zelda-light-blue mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text-sm bg-zelda-teal/20 text-zelda-light-blue rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              className="inline-block text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
            >
              View Project →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
