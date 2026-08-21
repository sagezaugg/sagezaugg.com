import React from "react";

/** Scanline and vignette layers that make the page read as a lit screen. */
const ScreenOverlay: React.FC = () => (
  <>
    <div className="screen-overlay screen-overlay-scanlines print-hidden" aria-hidden="true" />
    <div className="screen-overlay screen-overlay-vignette print-hidden" aria-hidden="true" />
  </>
);

export default ScreenOverlay;
