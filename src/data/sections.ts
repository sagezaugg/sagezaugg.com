import type { RuneName } from "../components/os/RuneIcon";

export interface SectionDef {
  id: string;
  /** Two-digit index shown in the monospace section code. */
  code: string;
  /** Display heading, also used as the rune tooltip. */
  label: string;
  /** Used where all six labels share a phone's width; falls back to label. */
  shortLabel?: string;
  rune: RuneName;
}

export const SECTIONS: SectionDef[] = [
  { id: "profile", code: "01", label: "Profile", rune: "eye" },
  { id: "experience", code: "02", label: "Experience", rune: "monolith" },
  { id: "skills", code: "03", label: "Skills", rune: "hex" },
  { id: "education", code: "04", label: "Education", rune: "beacon" },
  {
    id: "work",
    code: "05",
    label: "Selected Work",
    shortLabel: "Work",
    rune: "diamond",
  },
  { id: "contact", code: "06", label: "Contact", rune: "signal" },
];

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/**
 * The launcher treats the profile as the home screen rather than a shortcut,
 * so everything except it becomes an openable app.
 */
export const APP_SECTIONS = SECTIONS.filter(
  (section) => section.id !== "profile"
);

export const APP_IDS = APP_SECTIONS.map((section) => section.id);

export const SECTION_BY_ID: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((section) => [section.id, section])
);

export const sectionDomId = (id: string) => `section-${id}`;
