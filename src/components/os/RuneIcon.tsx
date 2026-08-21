import React from "react";

export type RuneName =
  | "eye"
  | "monolith"
  | "hex"
  | "beacon"
  | "diamond"
  | "signal";

interface RuneIconProps {
  name: RuneName;
  className?: string;
}

/**
 * Geometric glyphs in the Sheikah vein: circles, arcs and dots rather than
 * literal pictograms. Each is drawn in a 24x24 box with stroked paths so it
 * inherits color and can glow with the surrounding rune button.
 */
const GLYPHS: Record<RuneName, React.ReactNode> = {
  eye: (
    <>
      <path d="M2.5 12c3-4.5 6.2-6.8 9.5-6.8S18.5 7.5 21.5 12c-3 4.5-6.2 6.8-9.5 6.8S5.5 16.5 2.5 12Z" />
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 18.8 12 22" />
    </>
  ),
  monolith: (
    <>
      <path d="M12 2.5v19" />
      <path d="M5.5 8.5c2.4 0 4.3 1.6 4.3 3.5" />
      <path d="M18.5 8.5c-2.4 0-4.3 1.6-4.3 3.5" />
      <path d="M6.5 16.5h11" />
      <circle cx="12" cy="4.2" r="1.6" />
    </>
  ),
  hex: (
    <>
      <path d="M12 2.6 20.1 7.3v9.4L12 21.4 3.9 16.7V7.3Z" />
      <path d="M12 8.2 15.9 14.6H8.1Z" />
    </>
  ),
  beacon: (
    <>
      <path d="M12 3.2 20.6 9.1H3.4Z" />
      <path d="M6.4 11.6v6.2" />
      <path d="M17.6 11.6v6.2" />
      <path d="M4 20.8h16" />
      <circle cx="12" cy="14.6" r="1.5" />
    </>
  ),
  diamond: (
    <>
      <path d="M12 2.4 21.6 12 12 21.6 2.4 12Z" />
      <path d="M12 7.6 16.4 12 12 16.4 7.6 12Z" />
    </>
  ),
  signal: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.2 7.2a6.8 6.8 0 0 0 0 9.6" />
      <path d="M16.8 16.8a6.8 6.8 0 0 0 0-9.6" />
      <path d="M4.1 4.1a11.2 11.2 0 0 0 0 15.8" />
      <path d="M19.9 19.9a11.2 11.2 0 0 0 0-15.8" />
    </>
  ),
};

const RuneIcon: React.FC<RuneIconProps> = ({ name, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {GLYPHS[name]}
  </svg>
);

export default RuneIcon;
