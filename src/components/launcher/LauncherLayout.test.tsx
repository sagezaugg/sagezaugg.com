import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import App from "../../App";
import { EDUCATION, EMAIL, PROFILE, ROLES, WORK } from "../../data/resume";
import {
  hasPlayedQuestLogIntro,
  resetQuestLogIntro,
} from "../../data/questLog";

vi.mock("../../config/site", () => ({
  LAYOUT: "launcher",
  EFFECTS: {
    bootSequence: false,
    deviceFrame: true,
    runeRail: true,
    scanlines: false,
    particles: false,
    panelSweep: false,
  },
}));

/** The print copy of the resume is aria-hidden, so scoping keeps it out. */
const app = () => within(screen.getByRole("main"));
const rail = () => screen.getByRole("navigation", { name: "Sections" });

beforeEach(() => {
  window.history.pushState(null, "", "/");
  resetQuestLogIntro();
});

test("opens on the profile, not a grid of app shortcuts", () => {
  render(<App />);

  expect(
    app().getByRole("heading", { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();

  expect(
    app().queryByRole("navigation", { name: "Applications" })
  ).not.toBeInTheDocument();
});

test("the rune rail is the only way to open apps, and skips filing-cabinet sections", () => {
  render(<App />);

  const buttons = within(rail()).getAllByRole("button");
  expect(buttons).toHaveLength(4);

  expect(
    within(rail()).getByRole("button", { name: "Profile" })
  ).toBeInTheDocument();
  expect(
    within(rail()).getByRole("button", { name: "Quest Log" })
  ).toBeInTheDocument();
  expect(
    within(rail()).getByRole("button", { name: "Skills" })
  ).toBeInTheDocument();
  expect(
    within(rail()).getByRole("button", { name: "Selected Work" })
  ).toBeInTheDocument();
  expect(
    within(rail()).queryByRole("button", { name: "Education" })
  ).not.toBeInTheDocument();
  expect(
    within(rail()).queryByRole("button", { name: "Contact" })
  ).not.toBeInTheDocument();
});

test("education lives on the home profile instead of its own app", () => {
  render(<App />);

  for (const school of EDUCATION) {
    expect(app().getByText(school.institution)).toBeInTheDocument();
  }
});

test("home surfaces a featured work piece", () => {
  render(<App />);

  const featured = WORK.find((item) => item.featured) ?? WORK[0];
  expect(
    app().getByRole("heading", { name: featured.title })
  ).toBeInTheDocument();
});

test("the status bar carries a signal that mails you", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: "Send a signal" })).toHaveAttribute(
    "href",
    `mailto:${EMAIL}`
  );
});

test("opening a rune replaces home with that app", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));

  expect(
    app().getByRole("heading", { level: 1, name: "Quest Log" })
  ).toBeInTheDocument();
  expect(
    app().queryByRole("heading", { level: 1, name: PROFILE.name })
  ).not.toBeInTheDocument();
  expect(window.location.hash).toBe("#quests");
});

test("an opened app shows a box per entry", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));

  for (const role of ROLES) {
    expect(
      app().getByRole("heading", { name: role.title })
    ).toBeInTheDocument();
  }
});

test("the quest log is not remounted after the leftover morph timeout", () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });

  try {
    render(<App />);
    fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));

    const heading = app().getByRole("heading", { name: ROLES[0].title });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(app().getByRole("heading", { name: ROLES[0].title })).toBe(heading);
  } finally {
    vi.useRealTimers();
  }
});

test("switching apps keeps the collapsed profile and crossfades the pages", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));
  const back = app().getByRole("button", { name: "Back home" });

  fireEvent.click(within(rail()).getByRole("button", { name: "Skills" }));

  expect(app().getByRole("button", { name: "Back home" })).toBe(back);
  expect(
    app().getByRole("heading", { level: 1, name: "Skills" })
  ).toBeInTheDocument();
  expect(
    app().getByRole("heading", { level: 1, name: "Quest Log" })
  ).toBeInTheDocument();
});

test("the back button returns home", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Skills" }));
  fireEvent.click(app().getByRole("button", { name: "Back home" }));

  expect(
    app().getByRole("heading", { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();
});

test("escape closes an open app", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));
  fireEvent.keyDown(window, { key: "Escape" });

  expect(
    app().getByRole("heading", { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();
});

test("opening an app records it in the url so the link can be shared", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Selected Work" }));

  expect(window.location.hash).toBe("#work");
});

test("the quest log intro is remembered after leaving, not after opening", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Quest Log" }));
  expect(hasPlayedQuestLogIntro()).toBe(false);

  fireEvent.click(within(rail()).getByRole("button", { name: "Skills" }));
  expect(hasPlayedQuestLogIntro()).toBe(true);
});

test("a deep link opens straight into that app", () => {
  window.history.pushState(null, "", "#skills");
  render(<App />);

  expect(
    app().getByRole("heading", { level: 1, name: "Skills" })
  ).toBeInTheDocument();
});

test("an old experience hash still opens the quest log", () => {
  window.history.pushState(null, "", "#experience");
  render(<App />);

  expect(
    app().getByRole("heading", { level: 1, name: "Quest Log" })
  ).toBeInTheDocument();
  expect(window.location.hash).toBe("#quests");
});

test("print keeps degrees on the profile and drops the old education section", () => {
  render(<App />);

  const printRoot = document.querySelector(".print-only");
  expect(printRoot).toBeTruthy();

  expect(
    within(printRoot as HTMLElement).queryByRole("heading", {
      name: "Education",
      hidden: true,
    })
  ).not.toBeInTheDocument();
  expect(
    within(printRoot as HTMLElement).getByText(EDUCATION[0].institution)
  ).toBeInTheDocument();
});

test("the profile rune returns home from an open app", () => {
  render(<App />);

  fireEvent.click(within(rail()).getByRole("button", { name: "Selected Work" }));
  fireEvent.click(within(rail()).getByRole("button", { name: "Profile" }));

  expect(
    app().getByRole("heading", { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();
});
