import React from "react";
import QuestLog from "../entries/QuestLog";
import SkillCategoryEntry from "../entries/SkillCategoryEntry";
import WorkEntry from "../entries/WorkEntry";
import { SKILL_CATEGORIES, WORK } from "../../data/resume";

export interface AppBox {
  key: string;
  content: React.ReactNode;
}

export const getAppBoxes = (appId: string): AppBox[] => {
  switch (appId) {
    case "quests":
      return [{ key: "quest-log", content: <QuestLog /> }];
    case "skills":
      return SKILL_CATEGORIES.map((category) => ({
        key: category.label,
        content: <SkillCategoryEntry category={category} />,
      }));
    case "work":
      return WORK.map((item) => ({
        key: item.id,
        content: <WorkEntry item={item} />,
      }));
    default:
      return [];
  }
};
