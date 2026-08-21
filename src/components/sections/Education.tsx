import React from "react";
import Panel from "../os/Panel";
import EducationEntry from "../entries/EducationEntry";
import { EDUCATION } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Education: React.FC = () => (
  <Panel section={SECTION_BY_ID.education}>
    <div className="space-y-5">
      {EDUCATION.map((entry) => (
        <EducationEntry
          key={entry.id}
          entry={entry}
          className="border-t border-zelda-light-blue/15 pt-5 first:border-t-0 first:pt-0"
        />
      ))}
    </div>
  </Panel>
);

export default Education;
