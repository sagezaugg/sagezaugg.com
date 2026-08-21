import React, { useEffect, useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CollapsedProfile from "./CollapsedProfile";
import { getAppBoxes } from "./appBoxes";
import { boxEntrance, PAGE, pageSlide } from "./motion";
import { appDirection, type SectionDef } from "../../data/sections";

interface AppScreenProps {
  section: SectionDef;
  onBack: () => void;
}

const BOX_CLASSES =
  "sheikah-border bg-zelda-dark/40 p-5 backdrop-blur-[2px] sm:p-8";

const AppScreen: React.FC<AppScreenProps> = ({ section, onBack }) => {
  const boxes = getAppBoxes(section.id);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousId = useRef(section.id);
  const direction = appDirection(previousId.current, section.id);

  useLayoutEffect(() => {
    previousId.current = section.id;
  }, [section.id]);

  // Opening an app replaces the screen, so send the caret somewhere meaningful
  // instead of leaving it on a button that no longer exists.
  useEffect(() => {
    headingRef.current?.focus();
  }, [section.id]);

  return (
    <div>
      <CollapsedProfile onBack={onBack} />

      {/* Padding keeps box glow inside the slide mask instead of shearing it off. */}
      <div className="relative -mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={section.id}
            custom={direction}
            variants={pageSlide}
            initial="enter"
            animate="idle"
            exit="leave"
            transition={PAGE}
            className="w-full"
          >
            <header className="mb-5">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-zelda-light-blue/60">
                <span>&sect; {section.code}</span>
                <span
                  className="h-px w-6 bg-zelda-light-blue/40"
                  aria-hidden="true"
                />
                <span className="uppercase">{section.label}</span>
              </div>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-1.5 font-serif text-3xl text-zelda-gold outline-none sm:text-4xl"
              >
                {section.label}
              </h1>
            </header>

            <div className="space-y-5">
              {boxes.map((box, index) => {
                const framed = section.id !== "quests";
                const shell = framed ? BOX_CLASSES : "";

                return (
                  <motion.div
                    key={box.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={boxEntrance(index)}
                    className={shell}
                  >
                    {box.content}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppScreen;
