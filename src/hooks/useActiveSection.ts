import { useCallback, useEffect, useRef, useState } from "react";
import { sectionDomId } from "../data/sections";

/** Just below the fixed status bar — the line a section "arrives" at. */
const BAND_TOP = 88;

export interface ActiveSection {
  activeId: string;
  /** Pins a section as active until the reader scrolls again. */
  select: (id: string) => void;
}

/**
 * Tracks which section currently owns the viewport so the rail can highlight
 * it. The active section is the last one whose top has passed the reading band,
 * which stays correct for very long sections; at the end of the document the
 * final section wins, since it can never scroll up to the band.
 *
 * A chosen section stays pinned until the reader scrolls under their own steam,
 * so clicking a rune or opening a deep link always lights the section asked for
 * even when the page cannot scroll far enough to put it at the band.
 *
 * Recomputes on scroll and on intersection changes: scroll events are tied to
 * rendering and stop firing in a background tab, whereas observer callbacks
 * still arrive, so together they keep the rail honest either way.
 */
export const useActiveSection = (ids: string[]): ActiveSection => {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const pinnedRef = useRef(false);
  const key = ids.join(",");

  const select = useCallback((id: string) => {
    pinnedRef.current = true;
    setActiveId(id);
  }, []);

  useEffect(() => {
    const sectionIds = key.split(",").filter(Boolean);
    if (sectionIds.length === 0) return;

    const recompute = () => {
      if (pinnedRef.current) return;

      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2;

      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(sectionDomId(id));
        if (!el) continue;
        if (el.getBoundingClientRect().top <= BAND_TOP + 1) {
          current = id;
        }
      }

      setActiveId(current);
    };

    const unpin = () => {
      pinnedRef.current = false;
      recompute();
    };

    recompute();
    const settle = setTimeout(recompute, 0);

    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    window.addEventListener("wheel", unpin, { passive: true });
    window.addEventListener("touchstart", unpin, { passive: true });
    window.addEventListener("keydown", unpin);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(recompute, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
      });

      for (const id of sectionIds) {
        const el = document.getElementById(sectionDomId(id));
        if (el) observer.observe(el);
      }
    }

    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("wheel", unpin);
      window.removeEventListener("touchstart", unpin);
      window.removeEventListener("keydown", unpin);
      observer?.disconnect();
    };
  }, [key]);

  return { activeId, select };
};
