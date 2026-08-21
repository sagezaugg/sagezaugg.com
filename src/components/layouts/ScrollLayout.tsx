import React, { useCallback } from "react";

import { EFFECTS } from "../../config/site";
import { SECTION_IDS, sectionDomId } from "../../data/sections";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useHashScroll } from "../../hooks/useHashScroll";

import RuneRail from "../os/RuneRail";
import TopNav from "../os/TopNav";

import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Profile from "../sections/Profile";
import Skills from "../sections/Skills";
import Work from "../sections/Work";

/** Every section on one page, navigated by scrolling. */
const ScrollLayout: React.FC = () => {
  const { activeId, select } = useActiveSection(SECTION_IDS);

  useHashScroll(select);

  const goToSection = useCallback(
    (id: string) => {
      select(id);
      document.getElementById(sectionDomId(id))?.scrollIntoView({
        behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    },
    [select]
  );

  return (
    <>
      {EFFECTS.runeRail && (
        <RuneRail activeId={activeId} onSelect={goToSection} />
      )}

      <main
        className={`print-reset relative z-10 mx-auto max-w-4xl px-4 pb-[45vh] pt-16 sm:px-6 ${
          EFFECTS.runeRail ? "md:pl-24 xl:pl-4" : ""
        }`}
      >
        {!EFFECTS.runeRail && <TopNav activeId={activeId} onSelect={select} />}

        <div className="space-y-8">
          <Profile />
          <Experience />
          <Skills />
          <Education />
          <Work />
          <Contact />
        </div>
      </main>
    </>
  );
};

export default ScrollLayout;
