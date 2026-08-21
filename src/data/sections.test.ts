import { appDirection } from "./sections";

test("a rune to the right of the current one is a forward slide", () => {
  expect(appDirection("quests", "skills")).toBe(1);
  expect(appDirection("quests", "work")).toBe(1);
});

test("a rune to the left of the current one is a backward slide", () => {
  expect(appDirection("work", "skills")).toBe(-1);
  expect(appDirection("skills", "quests")).toBe(-1);
});

test("opening the same app or an unknown id does not slide", () => {
  expect(appDirection("skills", "skills")).toBe(0);
  expect(appDirection("quests", "nope")).toBe(0);
});
