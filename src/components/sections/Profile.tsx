import React from "react";
import Panel from "../os/Panel";
import SocialLinks from "../SocialLinks";
import { EMAIL, PROFILE } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Profile: React.FC = () => (
  <Panel
    section={SECTION_BY_ID.profile}
    title={PROFILE.name}
    headingTag="h1"
  >
    {/* Contact line only surfaces in print, where the status bar is stripped. */}
    <p className="mb-4 hidden font-mono text-xs print:block">
      {EMAIL} &middot; linkedin.com/in/sage-zora &middot; github.com/sagezaugg
    </p>

    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
      <div className="print-hidden h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-zelda-gold shadow-sheikah sm:h-40 sm:w-40">
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 text-center sm:text-left">
        <p className="font-serif text-xl text-zelda-light-blue sm:text-2xl">
          {PROFILE.tagline}
        </p>
        <div className="mt-4 space-y-3">
          {PROFILE.summary.map((paragraph) => (
            <p key={paragraph} className="text-zelda-text">
              {paragraph}
            </p>
          ))}
        </div>
        <SocialLinks
          links={PROFILE.links}
          className="print-hidden mt-6 justify-center sm:justify-start"
        />
      </div>
    </div>
  </Panel>
);

export default Profile;
