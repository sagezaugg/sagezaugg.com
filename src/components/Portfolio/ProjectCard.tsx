import React from "react";
import { motion } from "framer-motion";
import { Project } from "../../utils/portfolioConstants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        scale: {
          duration: 0.15,
          ease: "easeOut",
        },
      }}
      className="relative sheikah-border p-4 sm:p-6 overflow-hidden"
    >
      {/* Blurred background */}
      <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-[1px]" />

      <div className="relative">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zelda-dark/50 to-transparent" />
        </div>

        <h3 className="text-2xl font-serif text-zelda-gold mb-2">
          {project.title}
        </h3>

        <p className="text-zelda-light-blue mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 text-sm bg-zelda-dark/25 text-zelda-light-blue rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.link}
            className="inline-block text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
          >
            View Project →
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
