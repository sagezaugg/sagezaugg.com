import React from "react";
import { Project } from "../../utils/portfolioConstants";
import { Card } from "../common/Card";
import GithubButton from "../Social/GithubButton";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <Card index={index} className="p-4 sm:p-6">
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
          <div className="ml-auto">
            <GithubButton url={project.githubLink} />
          </div>
        )}
      </div>
    </Card>
  );
};
