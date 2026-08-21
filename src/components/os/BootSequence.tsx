import React, { useEffect, useState } from "react";
import RuneIcon from "./RuneIcon";
import { PROFILE } from "../../data/resume";

interface BootSequenceProps {
  onComplete: () => void;
}

const HOLD_MS = 1200;
const FADE_MS = 300;

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const hold = setTimeout(() => setExiting(true), HOLD_MS);
    const finish = setTimeout(onComplete, HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(hold);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-[#04141a] ${
        exiting ? "boot-overlay-exit" : ""
      }`}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="boot-ring absolute inset-0 rounded-full border border-dashed border-zelda-light-blue/40" />
        <div className="absolute inset-3 rounded-full border border-zelda-light-blue/20" />
        <RuneIcon
          name="eye"
          className="boot-rune h-12 w-12 text-zelda-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]"
        />
      </div>

      <div className="space-y-1.5 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-zelda-light-blue/80">
        <p>Loading</p>
        <p className="text-zelda-light-blue/50">Authenticating traveler</p>
        <p className="text-zelda-gold/80">{PROFILE.name}</p>
      </div>
    </div>
  );
};

export default BootSequence;
