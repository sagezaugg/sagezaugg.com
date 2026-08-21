import { render, screen } from "@testing-library/react";
import SkillCategoryEntry from "./SkillCategoryEntry";
import type { Skill, SkillCategory } from "../../types/resume";

const typescript: Skill = {
  name: "TypeScript",
  rating: 9,
  icon: "typescript",
  color: "#3178C6",
};

const react: Skill = {
  name: "React",
  rating: 8,
  icon: "react",
  color: "#61DAFB",
};

const category = (skills: Skill[]): SkillCategory => ({
  label: "Technical",
  skills,
});

test("exposes each skill as a named 1-to-10 meter", () => {
  render(<SkillCategoryEntry category={category([typescript])} />);

  const meter = screen.getByRole("meter", { name: "TypeScript" });
  expect(meter).toHaveAttribute("aria-valuemin", "0");
  expect(meter).toHaveAttribute("aria-valuemax", "10");
  expect(meter).toHaveAttribute("aria-valuenow", "9");
});

test("fills one pip per rating point out of ten", () => {
  render(<SkillCategoryEntry category={category([typescript])} />);

  const meter = screen.getByRole("meter", { name: "TypeScript" });
  const pips = meter.querySelectorAll("[data-filled]");

  expect(pips).toHaveLength(10);
  expect(
    [...pips].filter((pip) => pip.getAttribute("data-filled") === "true")
  ).toHaveLength(9);
  expect(pips[8]).toHaveAttribute("data-filled", "true");
  expect(pips[9]).toHaveAttribute("data-filled", "false");
});

test("paints filled pips with the skill color", () => {
  render(<SkillCategoryEntry category={category([typescript])} />);

  const meter = screen.getByRole("meter", { name: "TypeScript" });
  const filled = meter.querySelector("[data-filled='true']");

  expect(filled).toHaveStyle({ backgroundColor: "#3178C6" });
});

test("skips the meter when a skill is unrated flavor instead of a self-score", () => {
  const flavor: Skill = {
    name: "Ambiguity Navigation",
    rating: 8,
    icon: "ambiguity",
    color: "#A8A29E",
    rated: false,
  };

  render(<SkillCategoryEntry category={category([flavor])} />);

  expect(screen.getByText("Ambiguity Navigation")).toBeInTheDocument();
  expect(screen.queryByRole("meter")).not.toBeInTheDocument();
});

test("renders a distinct icon per skill", () => {
  render(<SkillCategoryEntry category={category([typescript, react])} />);

  const tsRow = screen.getByRole("meter", { name: "TypeScript" }).closest("li");
  const reactRow = screen.getByRole("meter", { name: "React" }).closest("li");
  const tsIcon = tsRow?.querySelector("svg");
  const reactIcon = reactRow?.querySelector("svg");

  expect(tsIcon).toBeTruthy();
  expect(reactIcon).toBeTruthy();
  expect(tsIcon?.innerHTML).not.toBe(reactIcon?.innerHTML);
});
