import React from "react";
import { motion } from "framer-motion";
import BackButton from "./BackButton";
import { PROFILE } from "../../data/resume";
import { PROFILE_AVATAR_ID, PROFILE_NAME_ID } from "./sharedIds";
import { MORPH } from "./motion";

/**
 * What the profile card becomes once an app is open: the same photo and name,
 * carried to the top left by a shared layout animation.
 */
const CollapsedProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="mb-6 flex items-center gap-3">
    <BackButton onClick={onBack} />

    <motion.div
      layoutId={PROFILE_AVATAR_ID}
      transition={MORPH}
      className="h-11 w-11 overflow-hidden rounded-full border-2 border-zelda-gold shadow-sheikah"
    >
      <img
        src={PROFILE.photo}
        alt={PROFILE.name}
        className="h-full w-full object-cover object-[center_18%]"
      />
    </motion.div>

    <motion.span
      layoutId={PROFILE_NAME_ID}
      transition={MORPH}
      className="font-serif text-xl text-zelda-gold sm:text-2xl"
    >
      {PROFILE.name}
    </motion.span>
  </div>
);

export default CollapsedProfile;
