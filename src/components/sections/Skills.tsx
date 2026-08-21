import React from "react";
import Panel from "../os/Panel";
import SkillCategoryEntry from "../entries/SkillCategoryEntry";
import { SKILL_CATEGORIES } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Skills: React.FC = () => (
  <Panel section={SECTION_BY_ID.skills}>
    <div className="grid gap-6 sm:grid-cols-2">
      {SKILL_CATEGORIES.map((category) => (
        <SkillCategoryEntry key={category.label} category={category} />
      ))}
    </div>
  </Panel>
);

export default Skills;
