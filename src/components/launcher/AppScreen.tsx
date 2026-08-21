import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CollapsedProfile from "./CollapsedProfile";
import { getAppBoxes } from "./appBoxes";
import { sharedShellId } from "./sharedIds";
import { boxEntrance, FADE, MORPH, MORPH_MS } from "./motion";
import type { SectionDef } from "../../data/sections";

interface AppScreenProps {
  section: SectionDef;
  onBack: () => void;
}

const BOX_CLASSES =
  "sheikah-border bg-zelda-dark/40 p-5 backdrop-blur-[2px] sm:p-8";

const AppScreen: React.FC<AppScreenProps> = ({ section, onBack }) => {
  const boxes = getAppBoxes(section.id);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [morphing, setMorphing] = useState(true);

  // Opening an app replaces the screen, so send the caret somewhere meaningful
  // instead of leaving it on a button that no longer exists.
  useEffect(() => {
    headingRef.current?.focus();
  }, [section.id]);

  // The shared id is what lets the shortcut grow into this box, but leaving it
  // in place would also run the morph backwards on the way out, fighting the
  // profile card expanding at the same moment. Clearing it alone is not enough,
  // since the pairing survives the prop change, so the box is remounted under a
  // new key once the entrance is done. Growth is then one-way no matter how the
  // screen is closed: back button, escape, a rune, or the browser's own back.
  useEffect(() => {
    setMorphing(true);
    const settled = setTimeout(() => setMorphing(false), MORPH_MS + 120);
    return () => clearTimeout(settled);
  }, [section.id]);

  return (
    <div>
      <CollapsedProfile onBack={onBack} />

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...FADE, delay: 0.1 }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-zelda-light-blue/60">
          <span>&sect; {section.code}</span>
          <span className="h-px w-6 bg-zelda-light-blue/40" aria-hidden="true" />
          <span className="uppercase">{section.label}</span>
        </div>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-1.5 font-serif text-3xl text-zelda-gold outline-none sm:text-4xl"
        >
          {section.label}
        </h1>
      </motion.header>

      <div className="space-y-5">
        {boxes.map((box, index) =>
          index === 0 ? (
            <motion.div
              key={morphing ? `${box.key}--morph` : box.key}
              layoutId={morphing ? sharedShellId(section.id) : undefined}
              transition={MORPH}
              className={BOX_CLASSES}
            >
              {box.content}
            </motion.div>
          ) : (
            <motion.div
              key={box.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={boxEntrance(index)}
              className={BOX_CLASSES}
            >
              {box.content}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default AppScreen;
