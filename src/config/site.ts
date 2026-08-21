/*
 * Live toggles for the Sheikah Slate chrome. Launcher is the product layout;
 * scroll remains as a fallback if EFFECTS need a long-page reading mode.
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
  deviceFrame: true,
  runeRail: true,
  scanlines: true,
  particles: true,
  panelSweep: false,
};
