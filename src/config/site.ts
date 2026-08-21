/* ==========================================================================
 * TEMPORARY — DESIGN SCAFFOLDING, MEANT TO BE REMOVED
 *
 * These toggles exist so the Sheikah Slate treatment can be dialed up or down
 * while settling on a direction. All true is the full device UI; all false is
 * a plain scrolling one-pager.
 *
 * Once a direction is picked: inline the winning values at each call site and
 * delete this file along with the `EFFECTS` imports.
 * ========================================================================== */

export interface Effects {
  /** Rune-forming authentication overlay on first paint (~1.2s). */
  bootSequence: boolean;
  /** Slate bezel and corner brackets framing the viewport. */
  deviceFrame: boolean;
  /** Vertical rune rail navigation. When false, a plain top anchor nav is used. */
  runeRail: boolean;
  /** Scanline and vignette overlay across the screen. */
  scanlines: boolean;
  /** Drifting particle field behind the content. */
  particles: boolean;
  /** Traveling light sweep across panel borders. */
  panelSweep: boolean;
}

export const EFFECTS: Effects = {
  bootSequence: true,
  deviceFrame: false,
  runeRail: true,
  scanlines: true,
  particles: true,
  panelSweep: false,
};
