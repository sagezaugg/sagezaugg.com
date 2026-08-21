import type { LifeEvent, Role } from "../types/resume";
import { LIFE_EVENTS, ROLES } from "./resume";

export type QuestStop =
  | { kind: "role"; sortKey: string; role: Role }
  | { kind: "life"; sortKey: string; event: LifeEvent };

const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Sept: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const roleSortKey = (monthYear: string): string => {
  const [month, year] = monthYear.split(" ");
  return `${year}-${MONTHS[month] ?? "01"}`;
};

let questLogIntroPlayed = false;

export const hasPlayedQuestLogIntro = () => questLogIntroPlayed;

export const markQuestLogIntroPlayed = () => {
  questLogIntroPlayed = true;
};

export const resetQuestLogIntro = () => {
  questLogIntroPlayed = false;
};

/** Newest first, jobs by end date so the current chapter stays on top. */
export const questStops = (): QuestStop[] => {
  const roles: QuestStop[] = ROLES.map((role) => ({
    kind: "role",
    sortKey: roleSortKey(role.end),
    role,
  }));
  const life: QuestStop[] = LIFE_EVENTS.map((event) => ({
    kind: "life",
    sortKey: event.sortKey,
    event,
  }));

  return [...roles, ...life].sort((a, b) => b.sortKey.localeCompare(a.sortKey));
};
