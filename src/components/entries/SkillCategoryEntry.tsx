import React, { useId } from "react";
import type { Skill, SkillCategory } from "../../types/resume";
import SkillIcon from "./SkillIcon";

const PIP_COUNT = 10;

interface SkillCategoryEntryProps {
  category: SkillCategory;
  className?: string;
}

const SkillRow: React.FC<{ skill: Skill }> = ({ skill }) => {
  const nameId = useId();
  const showMeter = skill.rated !== false;
  const filledCount = Math.min(PIP_COUNT, Math.max(0, skill.rating));

  return (
    <li className="flex items-center gap-2.5">
      <SkillIcon
        name={skill.icon}
        color={skill.color}
        className="h-4 w-4 shrink-0"
      />
      <span
        id={nameId}
        className="min-w-0 flex-1 text-sm leading-snug text-zelda-text"
      >
        {skill.name}
        {skill.note && (
          <span className="mt-0.5 block text-xs text-zelda-text/65">
            {skill.note}
          </span>
        )}
      </span>
      {showMeter && (
        <div
          role="meter"
          aria-labelledby={nameId}
          aria-valuemin={0}
          aria-valuemax={PIP_COUNT}
          aria-valuenow={filledCount}
          className="flex h-2 w-[6.75rem] shrink-0 gap-px sm:w-32"
        >
          {Array.from({ length: PIP_COUNT }, (_, index) => {
            const filled = index < filledCount;
            return (
              <span
                key={index}
                data-filled={filled ? "true" : "false"}
                className="skill-pip h-full flex-1 rounded-[1px]"
                style={{
                  backgroundColor: filled ? skill.color : "transparent",
                  boxShadow: filled
                    ? undefined
                    : `inset 0 0 0 1px ${skill.color}55`,
                }}
              />
            );
          })}
        </div>
      )}
    </li>
  );
};

const SkillCategoryEntry: React.FC<SkillCategoryEntryProps> = ({
  category,
  className = "",
}) => (
  <div className={className}>
    <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zelda-light-blue/70">
      {category.label}
    </h3>
    <ul className="space-y-2.5">
      {category.skills.map((skill) => (
        <SkillRow key={skill.name} skill={skill} />
      ))}
    </ul>
  </div>
);

export default SkillCategoryEntry;
