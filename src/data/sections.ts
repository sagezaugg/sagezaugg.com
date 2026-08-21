import type { RuneName } from "../components/os/RuneIcon";

export interface SectionDef {
  id: string;
  /** Two-digit index shown in the monospace section code. */
  code: string;
  /** Display heading, also used as the rune tooltip. */
  label: string;
  /** Used where several labels share a phone's width; falls back to label. */
  shortLabel?: string;
  rune: RuneName;
}

export const SECTIONS: SectionDef[] = [
  { id: "profile", code: "01", label: "Profile", rune: "eye" },
  { id: "quests", code: "02", label: "Quest Log", shortLabel: "Quests", rune: "monolith" },
  { id: "skills", code: "03", label: "Skills", rune: "hex" },
  {
    id: "work",
    code: "04",
    label: "Selected Work",
    shortLabel: "Work",
    rune: "diamond",
  },
  { id: "contact", code: "05", label: "Contact", rune: "signal" },
];

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/**
 * Launcher home is the profile. Education and contact are folded into the
 * profile and status bar rather than getting their own apps.
 */
const LAUNCHER_IDS = ["profile", "quests", "skills", "work"] as const;

export const LAUNCHER_SECTIONS: SectionDef[] = SECTIONS.filter((section) =>
  (LAUNCHER_IDS as readonly string[]).includes(section.id)
);

export const APP_SECTIONS = LAUNCHER_SECTIONS.filter(
  (section) => section.id !== "profile"
);

export const APP_IDS = APP_SECTIONS.map((section) => section.id);

export const SECTION_BY_ID: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((section) => [section.id, section])
);

export const sectionDomId = (id: string) => `section-${id}`;

/**
 * Dock order as a slide direction: 1 = toward Work, -1 = toward Quests,
 * 0 = no horizontal move (same app, or not on the rail).
 */
export const appDirection = (fromId: string, toId: string): number => {
  const from = LAUNCHER_SECTIONS.findIndex((section) => section.id === fromId);
  const to = LAUNCHER_SECTIONS.findIndex((section) => section.id === toId);
  if (from < 0 || to < 0 || from === to) return 0;
  return to > from ? 1 : -1;
};
