import React from "react";
import type { WorkItem } from "../../types/resume";

interface WorkEntryProps {
  item: WorkItem;
  className?: string;
}

const CaseBlock: React.FC<{ label: string; text: string }> = ({
  label,
  text,
}) => (
  <div>
    <h4 className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zelda-light-blue/70">
      {label}
    </h4>
    <p className="text-sm leading-relaxed text-zelda-text sm:text-base">{text}</p>
  </div>
);

const WorkEntry: React.FC<WorkEntryProps> = ({ item, className = "" }) => {
  const hasCase = Boolean(item.problem || item.approach || item.result);

  return (
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
      {item.hook && (
        <p className="mt-1 font-serif text-lg text-zelda-light-blue">{item.hook}</p>
      )}
      {!hasCase && (
        <p className="mt-1 text-sm text-zelda-text sm:text-base">
          {item.description}
        </p>
      )}

      {hasCase && (
        <div className="mt-4 space-y-3">
          {item.problem && <CaseBlock label="The mess" text={item.problem} />}
          {item.approach && (
            <CaseBlock label="What I did" text={item.approach} />
          )}
          {item.result && (
            <CaseBlock label="What changed" text={item.result} />
          )}
        </div>
      )}

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
};

export default WorkEntry;
