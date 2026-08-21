import React, { useCallback, useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import ShortcutTile from "./ShortcutTile";
import AppScreen from "./AppScreen";
import PrintResume from "../PrintResume";
import RuneRail from "../os/RuneRail";
import { EFFECTS } from "../../config/site";
import { APP_SECTIONS, SECTION_BY_ID } from "../../data/sections";
import { useAppRoute } from "../../hooks/useAppRoute";

const LauncherLayout: React.FC = () => {
  const { openAppId, openApp, closeApp } = useAppRoute();
  const tiles = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpened = useRef<string | null>(null);

  const handleOpen = useCallback(
    (id: string) => {
      lastOpened.current = id;
      openApp(id);
      window.scrollTo({ top: 0 });
    },
    [openApp]
  );

  // Returning home puts focus back on the tile that was opened, so tabbing
  // resumes where it left off rather than at the top of the document.
  useEffect(() => {
    if (openAppId !== null) return;
    const previous = lastOpened.current;
    if (!previous) return;
    lastOpened.current = null;
    tiles.current[previous]?.focus();
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
          activeId={openAppId ?? "profile"}
          onSelect={(id) => (id === "profile" ? closeApp() : handleOpen(id))}
        />
      )}

      <main
        className={`print-hidden relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-20 sm:px-6 ${
          EFFECTS.runeRail ? "md:pl-24 xl:pl-4" : ""
        }`}
      >
        {openSection ? (
          <AppScreen section={openSection} onBack={closeApp} />
        ) : (
          <div>
            <ProfileCard />

            {/* On a phone the docked rail already lists every app, so the grid
                would be the same six runes a second time. */}
            <div className={EFFECTS.runeRail ? "mt-10 hidden md:block" : "mt-10"}>
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-zelda-light-blue/60">
                <span>&sect; APPLICATIONS</span>
                <span
                  className="h-px flex-1 bg-zelda-light-blue/20"
                  aria-hidden="true"
                />
              </div>

              <nav
                aria-label="Applications"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              >
                {APP_SECTIONS.map((section, index) => (
                  <ShortcutTile
                    key={section.id}
                    section={section}
                    index={index}
                    onOpen={handleOpen}
                    buttonRef={(el) => {
                      tiles.current[section.id] = el;
                    }}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}
      </main>

      <PrintResume />
    </>
  );
};

export default LauncherLayout;
