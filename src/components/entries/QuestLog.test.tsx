import { render, screen } from "@testing-library/react";
import QuestLog from "./QuestLog";
import { LIFE_EVENTS, ROLES } from "../../data/resume";
import { questStops } from "../../data/questLog";

test("jobs sit by when they ended so the current chapter is on top", () => {
  const stops = questStops();
  const first = stops[0];

  expect(first.kind).toBe("role");
  if (first.kind === "role") {
    expect(first.role.id).toBe("alphasights-lead");
  }
});

test("mixes jobs and life events on one newest-first track", () => {
  const stops = questStops();
  const keys = stops.map((stop) => stop.sortKey);

  expect(keys).toEqual([...keys].sort((a, b) => b.localeCompare(a)));
  expect(stops.some((stop) => stop.kind === "life")).toBe(true);
  expect(stops.some((stop) => stop.kind === "role")).toBe(true);
});

test("renders every job and every life beat", () => {
  render(<QuestLog />);

  for (const role of ROLES) {
    expect(
      screen.getByRole("heading", { name: role.title })
    ).toBeInTheDocument();
  }

  for (const event of LIFE_EVENTS) {
    expect(
      screen.getByRole("heading", { name: event.title })
    ).toBeInTheDocument();
  }
});

test("each job is a paragraph, not a truncated bullet list", () => {
  render(<QuestLog />);

  for (const role of ROLES) {
    expect(screen.getByText(role.summary)).toBeInTheDocument();
  }
  expect(screen.queryByText(/more from this stop/i)).not.toBeInTheDocument();
});
