import React from "react";
import SocialLinks from "../SocialLinks";
import { EMAIL, PROFILE } from "../../data/resume";

const ContactEntry: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`space-y-5 ${className}`}>
    <p className="text-zelda-text">
      Open to conversations about staff and lead engineering roles, systems
      architecture, and developer enablement.
    </p>

    <a
      href={`mailto:${EMAIL}`}
      className="inline-block font-serif text-xl text-zelda-gold transition-colors hover:text-zelda-light-blue sm:text-2xl"
    >
      {EMAIL}
    </a>

    <SocialLinks links={PROFILE.links} />
  </div>
);

export default ContactEntry;
