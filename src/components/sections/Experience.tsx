import React from "react";
import Panel from "../os/Panel";
import QuestLog from "../entries/QuestLog";
import { SECTION_BY_ID } from "../../data/sections";

const Experience: React.FC = () => (
  <Panel section={SECTION_BY_ID.quests}>
    <QuestLog />
  </Panel>
);

export default Experience;
