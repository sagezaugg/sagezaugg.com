import { render, screen } from "@testing-library/react";
import WorkEntry from "./WorkEntry";
import type { WorkItem } from "../../types/resume";

const base: WorkItem = {
  id: "example",
  title: "Transitional Services",
  description: "A strangler around a monolith.",
  technologies: ["Kotlin"],
};

test("renders the short description when that is all the item has", () => {
  render(<WorkEntry item={base} />);

  expect(
    screen.getByRole("heading", { name: "Transitional Services" })
  ).toBeInTheDocument();
  expect(screen.getByText("A strangler around a monolith.")).toBeInTheDocument();
});

test("renders problem, approach, and result when they are present", () => {
  render(
    <WorkEntry
      item={{
        ...base,
        hook: "Cut the monolith without a big-bang rewrite.",
        problem: "One Ruby process owned too much of the product.",
        approach: "Peeled services off behind a translation layer.",
        result: "Two teams could ship in parallel.",
      }}
    />
  );

  expect(
    screen.getByText("Cut the monolith without a big-bang rewrite.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("One Ruby process owned too much of the product.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Peeled services off behind a translation layer.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Two teams could ship in parallel.")
  ).toBeInTheDocument();
});
