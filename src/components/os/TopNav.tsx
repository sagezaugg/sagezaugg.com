import React from "react";
import { SECTIONS, sectionDomId } from "../../data/sections";

interface TopNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

/** Plain anchor nav used when the rune rail is switched off. */
const TopNav: React.FC<TopNavProps> = ({ activeId, onSelect }) => (
  <nav
    aria-label="Sections"
    className="print-hidden mb-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
  >
    {SECTIONS.map((section) => (
      <a
        key={section.id}
        href={`#${sectionDomId(section.id)}`}
        onClick={() => onSelect(section.id)}
        className={`nav-link text-sm ${
          activeId === section.id ? "!text-zelda-gold [&::after]:w-full" : ""
        }`}
        aria-current={activeId === section.id ? "true" : undefined}
      >
        {section.label}
      </a>
    ))}
  </nav>
);

export default TopNav;
