import { useEffect } from "react";
import { SECTION_IDS, sectionDomId } from "../data/sections";

/**
 * Sections mount after the browser has already resolved the URL fragment, so a
 * shared link like /#section-quests lands at the top. Re-apply it once the
 * target exists, and report the section so the rail can light up.
 */
export const useHashScroll = (onResolved?: (id: string) => void) => {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    target.scrollIntoView({ behavior: "auto", block: "start" });

    const sectionId = SECTION_IDS.find((id) => sectionDomId(id) === hash);
    if (sectionId) onResolved?.(sectionId);
  }, [onResolved]);
};
