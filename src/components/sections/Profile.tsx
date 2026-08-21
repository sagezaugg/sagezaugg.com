import React from "react";
import Panel from "../os/Panel";
import SocialLinks from "../SocialLinks";
import { EDUCATION, EMAIL, PROFILE } from "../../data/resume";
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
      <div className="print-hidden w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-zelda-gold shadow-sheikah sm:w-48">
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className="aspect-[3/4] h-auto w-full object-cover object-[center_18%]"
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
        <SocialLinks
          links={PROFILE.links}
          className="print-hidden mt-6 justify-center sm:justify-start"
        />
      </div>
    </div>
  </Panel>
);

export default Profile;
