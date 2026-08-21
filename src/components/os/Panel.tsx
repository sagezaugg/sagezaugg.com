import React from "react";
import { motion } from "framer-motion";
import { EFFECTS } from "../../config/site";
import { sectionDomId, type SectionDef } from "../../data/sections";

interface PanelProps {
  section: SectionDef;
  children: React.ReactNode;
  /** Overrides the displayed heading; the rail tooltip still uses section.label. */
  title?: string;
  headingTag?: "h1" | "h2";
  className?: string;
}

const Panel: React.FC<PanelProps> = ({
  section,
  children,
  title,
  headingTag = "h2",
  className = "",
}) => {
  const Heading = headingTag;

  return (
    <motion.section
      id={sectionDomId(section.id)}
      aria-labelledby={`heading-${section.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`print-panel ${
        EFFECTS.panelSweep ? "sheikah-border-animated" : "sheikah-border"
      } bg-zelda-dark/40 p-5 backdrop-blur-[2px] sm:p-8 ${className}`}
    >
      <header className="mb-5">
        <div className="print-hidden flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-zelda-light-blue/60">
          <span>&sect; {section.code}</span>
          <span className="h-px w-6 bg-zelda-light-blue/40" aria-hidden="true" />
          <span className="uppercase">{section.label}</span>
        </div>
        <Heading
          id={`heading-${section.id}`}
          className="print-heading mt-1.5 font-serif text-3xl text-zelda-gold sm:text-4xl"
        >
          {title ?? section.label}
        </Heading>
      </header>
      {children}
    </motion.section>
  );
};

export default Panel;
