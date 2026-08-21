import React from "react";
import { motion } from "framer-motion";
import RuneIcon from "../os/RuneIcon";
import { appSummary } from "./appBoxes";
import { sharedShellId } from "./sharedIds";
import { MORPH, tileEntrance } from "./motion";
import type { SectionDef } from "../../data/sections";

interface ShortcutTileProps {
  section: SectionDef;
  index: number;
  onOpen: (id: string) => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

const ShortcutTile: React.FC<ShortcutTileProps> = ({
  section,
  index,
  onOpen,
  buttonRef,
}) => (
  <motion.button
    ref={buttonRef}
    type="button"
    onClick={() => onOpen(section.id)}
    layoutId={sharedShellId(section.id)}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...tileEntrance(index), layout: MORPH }}
    className="sheikah-border group flex flex-col items-center gap-2 bg-zelda-dark/40 px-4 py-5 text-center backdrop-blur-[2px] transition-colors hover:bg-zelda-dark/60"
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-zelda-light-blue/35 text-zelda-light-blue/80 transition-all duration-300 group-hover:border-zelda-gold group-hover:text-zelda-gold group-hover:shadow-rune-active">
      <RuneIcon name={section.rune} className="h-6 w-6" />
    </span>
    <span className="font-serif text-base text-zelda-gold sm:text-lg">
      {section.label}
    </span>
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zelda-light-blue/55">
      {appSummary(section.id)}
    </span>
  </motion.button>
);

export default ShortcutTile;
