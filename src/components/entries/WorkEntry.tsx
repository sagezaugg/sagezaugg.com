import React from "react";
import type { WorkItem } from "../../types/resume";

interface WorkEntryProps {
  item: WorkItem;
  className?: string;
}

const WorkEntry: React.FC<WorkEntryProps> = ({ item, className = "" }) => (
  <article className={`flex flex-col ${className}`}>
    {item.imageUrl && (
      <div className="print-hidden relative mb-4 h-40 overflow-hidden rounded-lg border border-zelda-light-blue/20">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-zelda-dark/60 to-transparent"
          aria-hidden="true"
        />
      </div>
    )}

    <h3 className="font-serif text-xl text-zelda-gold">{item.title}</h3>
    <p className="mt-1 text-sm text-zelda-text sm:text-base">
      {item.description}
    </p>

    <ul className="mt-3 flex flex-wrap gap-2">
      {item.technologies.map((tech) => (
        <li
          key={tech}
          className="print-chip rounded-full border border-zelda-light-blue/20 bg-zelda-dark/25 px-3 py-1 text-xs text-zelda-text"
        >
          {tech}
        </li>
      ))}
    </ul>

    {item.repoUrl && (
      <a
        href={item.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block self-start font-mono text-[11px] uppercase tracking-[0.18em] text-zelda-gold transition-colors hover:text-zelda-light-blue"
      >
        View source
      </a>
    )}
  </article>
);

export default WorkEntry;
