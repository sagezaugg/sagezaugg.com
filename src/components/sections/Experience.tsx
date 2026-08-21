import React from "react";
import Panel from "../os/Panel";
import RoleEntry from "../entries/RoleEntry";
import { ROLES } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Experience: React.FC = () => (
  <Panel section={SECTION_BY_ID.experience}>
    <div className="space-y-6">
      {ROLES.map((role) => (
        <RoleEntry
          key={role.id}
          role={role}
          className="border-t border-zelda-light-blue/15 pt-6 first:border-t-0 first:pt-0"
        />
      ))}
    </div>
  </Panel>
);

export default Experience;
