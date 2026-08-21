import React from "react";
import Panel from "../os/Panel";
import SocialLinks from "../SocialLinks";
import { EMAIL, PROFILE } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Contact: React.FC = () => (
  <Panel section={SECTION_BY_ID.contact}>
    <div className="space-y-5">
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
  </Panel>
);

export default Contact;
