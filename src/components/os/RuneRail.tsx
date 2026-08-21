import React from "react";
import RuneIcon from "./RuneIcon";
import { SECTIONS, sectionDomId } from "../../data/sections";

interface RuneRailProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const scrollToSection = (id: string) => {
  document.getElementById(sectionDomId(id))?.scrollIntoView({
    behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
};

const runeClasses = (isActive: boolean) =>
  [
    "group relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
    isActive
      ? "border-zelda-gold text-zelda-gold shadow-rune-active bg-zelda-dark/60"
      : "border-zelda-light-blue/35 text-zelda-light-blue/70 hover:border-zelda-light-blue hover:text-zelda-gold hover:shadow-sheikah bg-zelda-dark/35",
  ].join(" ");

const RuneRail: React.FC<RuneRailProps> = ({ activeId, onSelect }) => (
  <nav
    aria-label="Sections"
    className="print-hidden fixed z-40 inset-x-0 bottom-0 border-t border-zelda-light-blue/25 bg-zelda-dark/70 backdrop-blur-sm md:inset-x-auto md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:border-t-0 md:bg-transparent md:backdrop-blur-none"
  >
    <ul className="flex items-center justify-around gap-1 px-2 py-2 md:flex-col md:justify-center md:gap-3 md:py-0 md:pl-4">
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(section.id);
                scrollToSection(section.id);
              }}
              className={runeClasses(isActive)}
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
            >
              <RuneIcon name={section.rune} className="h-5 w-5" />
              <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded border border-zelda-light-blue/30 bg-zelda-dark/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zelda-light-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
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
