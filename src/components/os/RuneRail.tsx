import React from "react";
import RuneIcon from "./RuneIcon";
import { SECTIONS } from "../../data/sections";

interface RuneRailProps {
  activeId: string;
  /** What a rune does is the layout's business: scroll to it, or open it. */
  onSelect: (id: string) => void;
}

const glyphClasses = (isActive: boolean) =>
  [
    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
    isActive
      ? "border-zelda-gold text-zelda-gold shadow-rune-active bg-zelda-dark/60"
      : "border-zelda-light-blue/35 text-zelda-light-blue/70 group-hover:border-zelda-light-blue group-hover:text-zelda-gold group-hover:shadow-sheikah bg-zelda-dark/35",
  ].join(" ");

const RuneRail: React.FC<RuneRailProps> = ({ activeId, onSelect }) => (
  <nav
    aria-label="Sections"
    className="print-hidden fixed z-40 inset-x-0 bottom-0 border-t border-zelda-light-blue/25 bg-zelda-dark/70 backdrop-blur-sm md:inset-x-auto md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:border-t-0 md:bg-transparent md:backdrop-blur-none"
  >
    <ul className="flex items-stretch justify-around gap-0.5 px-1 py-2 md:flex-col md:items-center md:justify-center md:gap-3 md:px-0 md:py-0 md:pl-4">
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id} className="min-w-0 flex-1 md:flex-none">
            <button
              type="button"
              onClick={() => onSelect(section.id)}
              className="group relative flex w-full flex-col items-center gap-1 md:w-auto md:gap-0"
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={glyphClasses(isActive)}>
                <RuneIcon name={section.rune} className="h-5 w-5" />
              </span>

              {/* On a phone the rail is the only way to move between apps, so
                  the runes have to say what they open. */}
              <span
                className={`w-full truncate text-center font-mono text-[9px] uppercase leading-none transition-colors duration-300 md:hidden ${
                  isActive ? "text-zelda-gold" : "text-zelda-light-blue/60"
                }`}
              >
                {section.shortLabel ?? section.label}
              </span>

              <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded border border-zelda-light-blue/30 bg-zelda-dark/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zelda-light-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
                {section.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default RuneRail;
