import React from "react";
import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import { EMAIL, PROFILE } from "../../data/resume";
import { PROFILE_AVATAR_ID, PROFILE_NAME_ID } from "./sharedIds";
import { FADE, MORPH } from "./motion";

/** The home screen's identity card: the full profile, centered above the apps. */
const ProfileCard: React.FC = () => (
  <motion.section
    aria-labelledby="launcher-profile-name"
    className="sheikah-border mx-auto flex max-w-2xl flex-col items-center bg-zelda-dark/40 px-6 py-8 text-center backdrop-blur-[2px] sm:px-10"
  >
    <motion.div
      layoutId={PROFILE_AVATAR_ID}
      transition={MORPH}
      className="h-32 w-32 overflow-hidden rounded-full border-2 border-zelda-gold shadow-sheikah sm:h-36 sm:w-36"
    >
      <img
        src={PROFILE.photo}
        alt={PROFILE.name}
        className="h-full w-full object-cover"
      />
    </motion.div>

    <motion.h1
      layoutId={PROFILE_NAME_ID}
      transition={MORPH}
      id="launcher-profile-name"
      className="mt-5 font-serif text-4xl text-zelda-gold sm:text-5xl"
    >
      {PROFILE.name}
    </motion.h1>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...FADE, delay: 0.12 }}
      className="flex flex-col items-center"
    >
      <p className="mt-2 font-serif text-lg text-zelda-light-blue sm:text-xl">
        {PROFILE.tagline}
      </p>

      <div className="mt-5 space-y-3">
        {PROFILE.summary.map((paragraph) => (
          <p key={paragraph} className="text-zelda-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Only surfaces in print, where the status bar is stripped. */}
      <p className="mt-4 hidden font-mono text-xs print:block">
        {EMAIL} &middot; linkedin.com/in/sage-zora &middot; github.com/sagezaugg
      </p>

      <SocialLinks links={PROFILE.links} className="mt-6 justify-center" />
    </motion.div>
  </motion.section>
);

export default ProfileCard;
