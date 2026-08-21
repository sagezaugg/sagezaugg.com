import React from "react";
import Profile from "./sections/Profile";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Work from "./sections/Work";
import Contact from "./sections/Contact";

/**
 * The launcher only mounts one app at a time, so printing it would yield a
 * single screen. This renders the whole resume off-screen for print only.
 *
 * Hidden from assistive tech because it duplicates content that is already
 * reachable through the shortcuts.
 */
const PrintResume: React.FC = () => (
  <div className="print-only print-reset" aria-hidden="true">
    <Profile />
    <Experience />
    <Skills />
    <Education />
    <Work />
    <Contact />
  </div>
);

export default PrintResume;
