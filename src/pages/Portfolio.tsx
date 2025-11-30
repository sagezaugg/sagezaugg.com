import React, { useEffect, useState } from "react";
import { ProjectCard } from "../components/Portfolio/ProjectCard";
import { getProjects } from "../services/contentService";
import { ProjectMetadata } from "../types/content";

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<ProjectMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectList = await getProjects();
        setProjects(projectList);
        setError(null);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
          My Work
        </h2>
        <div className="text-center text-zelda-light-blue">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
          My Work
        </h2>
        <div className="text-center text-zelda-light-blue">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        My Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
