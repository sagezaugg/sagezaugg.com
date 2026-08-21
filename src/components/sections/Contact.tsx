import React from "react";
import Panel from "../os/Panel";
import ContactEntry from "../entries/ContactEntry";
import { SECTION_BY_ID } from "../../data/sections";

const Contact: React.FC = () => (
  <Panel section={SECTION_BY_ID.contact}>
    <ContactEntry />
  </Panel>
);

export default Contact;
