import React from "react";
import RuneIcon from "./RuneIcon";
import { SECTIONS, type SectionDef } from "../../data/sections";

interface RuneRailProps {
  activeId: string;
  /** What a rune does is the layout's business: scroll to it, or open it. */
  onSelect: (id: string) => void;
  sections?: SectionDef[];
}

const glyphClasses = (isActive: boolean) =>
  [
    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
    isActive
      ? "border-zelda-gold text-zelda-gold shadow-rune-active bg-zelda-dark/60"
      : "border-zelda-light-blue/35 text-zelda-light-blue/70 group-hover:border-zelda-light-blue group-hover:text-zelda-gold group-hover:shadow-sheikah bg-zelda-dark/35",
  ].join(" ");

const RuneRail: React.FC<RuneRailProps> = ({
  activeId,
  onSelect,
  sections = SECTIONS,
}) => (
  <nav
    aria-label="Sections"
    className="slate-dock print-hidden fixed inset-x-0 bottom-0 z-40 border-t border-zelda-light-blue/25 bg-zelda-dark/70 backdrop-blur-sm md:bottom-5 md:border-t-0 md:bg-transparent md:backdrop-blur-none md:px-4"
  >
    <ul className="flex items-stretch justify-around gap-0.5 px-1 py-2 md:mx-auto md:w-max md:items-center md:gap-2 md:rounded-2xl md:border md:border-zelda-light-blue/25 md:bg-zelda-dark/80 md:px-3 md:py-2.5 md:backdrop-blur-sm">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id} className="min-w-0 flex-1 md:flex-none">
            <button
              type="button"
              data-section-id={section.id}
              onClick={() => onSelect(section.id)}
              className="group flex w-full flex-col items-center gap-1 md:w-auto md:px-1"
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={glyphClasses(isActive)}>
                <RuneIcon name={section.rune} className="h-5 w-5" />
              </span>
              <span
                className={`w-full text-center font-mono text-[9px] uppercase leading-none tracking-[0.08em] transition-colors duration-300 md:w-auto md:overflow-visible md:whitespace-nowrap md:text-[10px] ${
                  isActive ? "text-zelda-gold" : "text-zelda-light-blue/60"
                } max-md:truncate`}
              >
                {section.shortLabel ?? section.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default RuneRail;
