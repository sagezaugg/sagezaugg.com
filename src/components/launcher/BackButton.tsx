import React from "react";

/**
 * Drawn in the same stroked 24x24 idiom as the runes so it reads as part of the
 * slate rather than a browser control: an arrow crossing a partial ring.
 */
const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Back to shortcuts"
    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zelda-gold/60 bg-zelda-dark/50 text-zelda-gold transition-all duration-300 hover:border-zelda-gold hover:shadow-rune-active"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14.5 6.5 9 12l5.5 5.5" />
      <path d="M4.6 7.4a8.4 8.4 0 1 0 3-3.1" />
    </svg>
  </button>
);

export default BackButton;
