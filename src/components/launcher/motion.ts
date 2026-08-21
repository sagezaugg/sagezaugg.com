/*
 * Shared timings for the launcher, kept in one place so the morph, the fades
 * and the staggered boxes stay in proportion when the pace is adjusted.
 */

/** How long a shortcut takes to grow into the first box. */
export const MORPH_MS = 620;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const MORPH = {
  duration: MORPH_MS / 1000,
  ease: EASE_OUT,
};

export const FADE = {
  duration: 0.55,
  ease: EASE_OUT,
};

/** Entrance of the shortcut tiles on the home screen. */
export const tileEntrance = (index: number) => ({
  ...FADE,
  delay: 0.1 + index * 0.08,
});

/** Boxes after the first arrive in sequence, once the morph is underway. */
export const boxEntrance = (index: number) => ({
  ...FADE,
  delay: 0.26 + (index - 1) * 0.11,
});
