import React from "react";
import Panel from "../os/Panel";
import { SKILL_CATEGORIES } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Skills: React.FC = () => (
  <Panel section={SECTION_BY_ID.skills}>
    <div className="grid gap-6 sm:grid-cols-2">
      {SKILL_CATEGORIES.map((category) => (
        <div key={category.label}>
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
      ))}
    </div>
  </Panel>
);

export default Skills;
