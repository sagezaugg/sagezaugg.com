import React from "react";
import RoleEntry from "../entries/RoleEntry";
import SkillCategoryEntry from "../entries/SkillCategoryEntry";
import EducationEntry from "../entries/EducationEntry";
import WorkEntry from "../entries/WorkEntry";
import ContactEntry from "../entries/ContactEntry";
import { EDUCATION, ROLES, SKILL_CATEGORIES, WORK } from "../../data/resume";

export interface AppBox {
  key: string;
  content: React.ReactNode;
}

const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? "" : "s"}`;

/**
 * Each app breaks into one box per entry, so a shortcut can expand into the
 * first box and let the rest arrive underneath it.
 */
export const getAppBoxes = (appId: string): AppBox[] => {
  switch (appId) {
    case "experience":
      return ROLES.map((role) => ({
        key: role.id,
        content: <RoleEntry role={role} />,
      }));
    case "skills":
      return SKILL_CATEGORIES.map((category) => ({
        key: category.label,
        content: <SkillCategoryEntry category={category} />,
      }));
    case "education":
      return EDUCATION.map((entry) => ({
        key: entry.id,
        content: <EducationEntry entry={entry} />,
      }));
    case "work":
      return WORK.map((item) => ({
        key: item.id,
        content: <WorkEntry item={item} />,
      }));
    case "contact":
      return [{ key: "contact", content: <ContactEntry /> }];
    default:
      return [];
  }
};

/** Sub-label on a shortcut tile, hinting at what is behind it. */
export const appSummary = (appId: string): string => {
  switch (appId) {
    case "experience":
      return plural(ROLES.length, "role");
    case "skills":
      return plural(SKILL_CATEGORIES.length, "area");
    case "education":
      return plural(EDUCATION.length, "school");
    case "work":
      return plural(WORK.length, "project");
    case "contact":
      return "Get in touch";
    default:
      return "";
  }
};
