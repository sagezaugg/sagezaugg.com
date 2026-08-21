/* ==========================================================================
 * TEMPORARY — DESIGN SCAFFOLDING, MEANT TO BE REMOVED
 *
 * LAYOUT picks between two competing designs; EFFECTS dials the Sheikah Slate
 * treatment up or down within whichever one is showing. All effects true is the
 * full device UI; all false is a plain page.
 *
 * Once a direction is picked: inline the winning values at each call site and
 * delete this file along with the `EFFECTS` imports.
 * ========================================================================== */

/**
 * "scroll" reads top to bottom with every section on the page at once.
 * "launcher" opens the profile card over a grid of app shortcuts, and each
 * shortcut expands into its own screen.
 */
export type Layout = "scroll" | "launcher";

export const LAYOUT: Layout = "launcher";

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
