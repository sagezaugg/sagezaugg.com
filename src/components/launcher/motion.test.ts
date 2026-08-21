import { FADE, PAGE, boxEntrance, railDraw, stopEntrance } from "./motion";

test("quest stops cascade after the header fade, not after a second morph wait", () => {
  expect(stopEntrance(0)).toEqual({
    ...FADE,
    delay: 0.1,
  });
  expect(stopEntrance(1).delay - stopEntrance(0).delay).toBeCloseTo(0.08);
});

test("the quest rail draws down with the first stops", () => {
  expect(railDraw.delay).toBe(0.1);
  expect(railDraw.duration).toBeGreaterThan(FADE.duration);
});

test("app pages crossfade faster than the home fades", () => {
  expect(PAGE.duration).toBeLessThan(FADE.duration);
  expect(PAGE.ease).toEqual(FADE.ease);
});

test("every app box including the first has an entrance delay", () => {
  expect(boxEntrance(0).delay).toBe(0.1);
  expect(boxEntrance(1).delay).toBeGreaterThan(boxEntrance(0).delay);
});
