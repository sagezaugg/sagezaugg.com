import React, { useEffect, useState } from "react";
import RuneIcon from "./RuneIcon";
import { PROFILE } from "../../data/resume";

const formatClock = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const StatusBar: React.FC = () => {
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="print-hidden fixed inset-x-0 top-0 z-50 h-10 border-b border-zelda-light-blue/25 bg-zelda-dark/70 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <RuneIcon
            name="eye"
            className="h-4 w-4 shrink-0 text-zelda-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]"
          />
          <span className="truncate font-serif text-base text-zelda-gold sm:text-lg">
            {PROFILE.name}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-zelda-light-blue/85 sm:text-[11px]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-zelda-gold animate-pulse-dot"
              aria-hidden="true"
            />
            <span className="uppercase">{PROFILE.availability}</span>
          </span>
          <span className="hidden font-mono text-[11px] tabular-nums tracking-[0.12em] text-zelda-light-blue/70 sm:inline">
            {clock}
          </span>
        </div>
      </div>
    </header>
  );
};

export default StatusBar;
