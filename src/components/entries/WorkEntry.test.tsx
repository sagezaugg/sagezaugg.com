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

test("renders a Play link when the item has a live url", () => {
  render(
    <WorkEntry
      item={{
        ...base,
        url: "https://arcadeplex.app",
      }}
    />
  );

  expect(screen.getByRole("link", { name: "Play" })).toHaveAttribute(
    "href",
    "https://arcadeplex.app"
  );
});

test("renders Play and View source together when both urls are set", () => {
  render(
    <WorkEntry
      item={{
        ...base,
        url: "https://arcadeplex.app",
        repoUrl: "https://github.com/sagezaugg/arcadeplex",
      }}
    />
  );

  expect(screen.getByRole("link", { name: "Play" })).toHaveAttribute(
    "href",
    "https://arcadeplex.app"
  );
  expect(screen.getByRole("link", { name: "View source" })).toHaveAttribute(
    "href",
    "https://github.com/sagezaugg/arcadeplex"
  );
});

test("tech chips reuse the skill icon and brand color", () => {
  render(
    <WorkEntry item={{ ...base, technologies: ["TypeScript", "React"] }} />
  );

  const tsChip = screen.getByText("TypeScript").closest("li");
  const reactChip = screen.getByText("React").closest("li");
  const tsIcon = tsChip?.querySelector("svg");
  const reactIcon = reactChip?.querySelector("svg");

  expect(tsIcon).toHaveStyle({ color: "#3178C6" });
  expect(reactIcon).toHaveStyle({ color: "#61DAFB" });
  expect(tsIcon?.innerHTML).not.toBe(reactIcon?.innerHTML);
});

test("work-only techs still get a brand icon", () => {
  render(<WorkEntry item={{ ...base, technologies: ["Three.js"] }} />);

  const chip = screen.getByText("Three.js").closest("li");
  expect(chip?.querySelector("svg")).toHaveStyle({ color: "#E5E7EB" });
});
