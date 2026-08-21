import React from "react";
import type { SkillCategory } from "../../types/resume";

interface SkillCategoryEntryProps {
  category: SkillCategory;
  className?: string;
}

const SkillCategoryEntry: React.FC<SkillCategoryEntryProps> = ({
  category,
  className = "",
}) => (
  <div className={className}>
    <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zelda-light-blue/70">
      {category.label}
    </h3>
    <ul className="flex flex-wrap gap-2">
      {category.skills.map((skill) => (
        <li
          key={skill}
          className="print-chip rounded-full border border-zelda-light-blue/20 bg-zelda-dark/25 px-3 py-1 text-sm text-zelda-text"
        >
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

export default SkillCategoryEntry;
