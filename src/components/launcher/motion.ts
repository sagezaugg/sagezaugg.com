/*
 * Shared timings for the launcher, kept in one place so the morph, the fades
 * and the staggered boxes stay in proportion when the pace is adjusted.
 */

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

/** App-to-app swap of the heading and body. Chrome stays put. */
export const PAGE = {
  duration: 0.35,
  ease: EASE_OUT,
};

const PAGE_SLIDE = 40;

/** Incoming from the rune you jumped toward; outgoing the other way. */
export const pageSlide = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * PAGE_SLIDE,
  }),
  idle: { opacity: 1, x: 0 },
  leave: (direction: number) => ({
    opacity: 0,
    x: direction * -PAGE_SLIDE,
  }),
};

/** Boxes arrive in sequence, including the first. */
export const boxEntrance = (index: number) => ({
  ...FADE,
  delay: 0.1 + index * 0.11,
});

/** Quest-log stops tick down the track with the header fade. */
export const stopEntrance = (index: number) => ({
  ...FADE,
  delay: 0.1 + index * 0.08,
});

/** The gold rail draws down in time with the first stretch of stops. */
export const railDraw = {
  duration: 0.85,
  delay: 0.1,
  ease: EASE_OUT,
};
