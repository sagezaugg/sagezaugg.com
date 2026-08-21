import { useCallback, useEffect, useState } from "react";
import { APP_IDS } from "../data/sections";

export interface AppRoute {
  /** The open app, or null for the launcher home screen. */
  openAppId: string | null;
  openApp: (id: string) => void;
  closeApp: () => void;
}

const HASH_ALIASES: Record<string, string> = {
  experience: "quests",
};

const readHash = (): string | null => {
  const raw = window.location.hash.replace(/^#/, "");
  const id = HASH_ALIASES[raw] ?? raw;
  if (id !== raw && APP_IDS.includes(id)) {
    window.history.replaceState(null, "", `#${id}`);
  }
  return APP_IDS.includes(id) ? id : null;
};

/**
 * Keeps the open app in the URL hash so a screen can be linked to and the
 * browser's own back button closes it, rather than leaving the page.
 *
 * State is the source of truth and the hash is pushed alongside it, because
 * writing the hash directly would make every open and close a round trip
 * through the hashchange event.
 */
export const useAppRoute = (): AppRoute => {
  const [openAppId, setOpenAppId] = useState<string | null>(readHash);

  const openApp = useCallback((id: string) => {
    setOpenAppId(id);
    window.history.pushState(null, "", `#${id}`);
  }, []);

  const closeApp = useCallback(() => {
    setOpenAppId(null);
    window.history.pushState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }, []);

  useEffect(() => {
    const sync = () => setOpenAppId(readHash());

    // popstate covers the back button; hashchange covers hand-edited URLs.
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);

    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  return { openAppId, openApp, closeApp };
};
