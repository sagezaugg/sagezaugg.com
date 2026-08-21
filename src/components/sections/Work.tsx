import React from "react";
import Panel from "../os/Panel";
import WorkEntry from "../entries/WorkEntry";
import { WORK } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Work: React.FC = () => (
  <Panel section={SECTION_BY_ID.work}>
    <div className={`grid gap-6 ${WORK.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {WORK.map((item) => (
        <WorkEntry key={item.id} item={item} />
      ))}
    </div>
  </Panel>
);

export default Work;
