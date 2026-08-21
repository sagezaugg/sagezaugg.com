import React from "react";
import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import { EDUCATION, EMAIL, PROFILE } from "../../data/resume";
import { PROFILE_AVATAR_ID, PROFILE_NAME_ID } from "./sharedIds";
import { FADE, MORPH } from "./motion";

/** The home screen's identity card: photo, voice, and the folded-in education. */
const ProfileCard: React.FC = () => (
  <motion.section
    aria-labelledby="launcher-profile-name"
    className="sheikah-border mx-auto flex max-w-3xl flex-col gap-6 bg-zelda-dark/40 px-6 py-8 backdrop-blur-[2px] sm:flex-row sm:items-start sm:px-10"
  >
    <motion.div
      layoutId={PROFILE_AVATAR_ID}
      transition={MORPH}
      className="mx-auto w-full max-w-[14rem] shrink-0 overflow-hidden rounded-2xl border-2 border-zelda-gold shadow-sheikah sm:mx-0 sm:max-w-[16rem]"
    >
      <img
        src={PROFILE.photo}
        alt={PROFILE.name}
        className="aspect-[3/4] h-auto w-full object-cover object-[center_18%]"
      />
    </motion.div>

    <div className="min-w-0 text-center sm:text-left">
      <motion.h1
        layoutId={PROFILE_NAME_ID}
        transition={MORPH}
        id="launcher-profile-name"
        className="font-serif text-4xl text-zelda-gold sm:text-5xl"
      >
        {PROFILE.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...FADE, delay: 0.12 }}
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

        {PROFILE.aside && (
          <p className="mt-4 text-sm text-zelda-light-blue/80">{PROFILE.aside}</p>
        )}

        <ul className="mt-5 space-y-1 font-mono text-[11px] tracking-[0.12em] text-zelda-light-blue/80">
          {EDUCATION.map((entry) => (
            <li key={entry.id}>
              {entry.degree}
              {" · "}
              {entry.institutionUrl ? (
                <a
                  href={entry.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zelda-light-blue transition-colors hover:text-zelda-gold"
                >
                  {entry.institution}
                </a>
              ) : (
                entry.institution
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 hidden font-mono text-xs print:block">
          {EMAIL} &middot; linkedin.com/in/sage-zora &middot; github.com/sagezaugg
        </p>

        <SocialLinks
          links={PROFILE.links}
          className="mt-6 justify-center sm:justify-start"
        />
      </motion.div>
    </div>
  </motion.section>
);

export default ProfileCard;
