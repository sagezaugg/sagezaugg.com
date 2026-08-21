import type { SkillIconName } from "../types/resume";
import { SKILL_CATEGORIES } from "./resume";

export interface TechMeta {
  icon: SkillIconName;
  color: string;
}

/** Brand marks for work chips that are not also listed as skills. */
const EXTRA_TECH: Record<string, TechMeta> = {
  "Three.js": { icon: "threejs", color: "#E5E7EB" },
  Vite: { icon: "vite", color: "#646CFF" },
  TailwindCSS: { icon: "tailwindcss", color: "#06B6D4" },
  Tsparticles: { icon: "tsparticles", color: "#67E8F9" },
};

const FROM_SKILLS: Record<string, TechMeta> = Object.fromEntries(
  SKILL_CATEGORIES.flatMap((category) => category.skills).map((skill) => [
    skill.name,
    { icon: skill.icon, color: skill.color },
  ])
);

export const techFor = (name: string): TechMeta | undefined =>
  FROM_SKILLS[name] ?? EXTRA_TECH[name];
