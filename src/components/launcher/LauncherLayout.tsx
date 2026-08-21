import React, { useCallback, useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import WorkEntry from "../entries/WorkEntry";
import AppScreen from "./AppScreen";
import PrintResume from "../PrintResume";
import RuneRail from "../os/RuneRail";
import { EFFECTS } from "../../config/site";
import { WORK } from "../../data/resume";
import { LAUNCHER_SECTIONS, SECTION_BY_ID } from "../../data/sections";
import { markQuestLogIntroPlayed } from "../../data/questLog";
import { useAppRoute } from "../../hooks/useAppRoute";

const featuredWork = WORK.find((item) => item.featured) ?? WORK[0];

const LauncherLayout: React.FC = () => {
  const { openAppId, openApp, closeApp } = useAppRoute();
  const lastOpened = useRef<string | null>(null);

  const handleOpen = useCallback(
    (id: string) => {
      lastOpened.current = id;
      openApp(id);
      document.querySelector(".slate-scroll")?.scrollTo?.({ top: 0 });
      window.scrollTo({ top: 0 });
    },
    [openApp]
  );

  // Returning home puts focus back on the rune that was opened.
  useEffect(() => {
    if (openAppId !== null) return;
    const previous = lastOpened.current;
    if (!previous) return;
    lastOpened.current = null;
    document
      .querySelector<HTMLButtonElement>(`[data-section-id="${previous}"]`)
      ?.focus();
  }, [openAppId]);

  const visitedQuests = useRef(false);

  useEffect(() => {
    if (openAppId === "quests") {
      visitedQuests.current = true;
      return;
    }
    if (visitedQuests.current) markQuestLogIntroPlayed();
  }, [openAppId]);

  useEffect(() => {
    if (openAppId === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeApp();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openAppId, closeApp]);

  const openSection = openAppId ? SECTION_BY_ID[openAppId] : undefined;

  return (
    <>
      {EFFECTS.runeRail && (
        <RuneRail
          sections={LAUNCHER_SECTIONS}
          activeId={openAppId ?? "profile"}
          onSelect={(id) => (id === "profile" ? closeApp() : handleOpen(id))}
        />
      )}

      <main
        className="print-hidden relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-20 sm:px-6"
      >
        {openSection ? (
          <AppScreen section={openSection} onBack={closeApp} />
        ) : (
          <div>
            <ProfileCard />

            {featuredWork && (
              <div className="mx-auto mt-10 max-w-3xl">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-zelda-light-blue/60">
                  <span>&sect; FEATURED</span>
                  <span
                    className="h-px flex-1 bg-zelda-light-blue/20"
                    aria-hidden="true"
                  />
                </div>
                <div className="sheikah-border bg-zelda-dark/40 p-5 backdrop-blur-[2px] sm:p-8">
                  <WorkEntry item={featuredWork} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <PrintResume />
    </>
  );
};

export default LauncherLayout;
