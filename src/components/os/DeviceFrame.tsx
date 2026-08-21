import React from "react";

const CORNERS = [
  "left-3 top-3 border-l-2 border-t-2 rounded-tl-md",
  "right-3 top-3 border-r-2 border-t-2 rounded-tr-md",
  "left-3 bottom-3 border-l-2 border-b-2 rounded-bl-md",
  "right-3 bottom-3 border-r-2 border-b-2 rounded-br-md",
];

/** The bezel of the slate: an inset glowing border with gold corner brackets. */
const DeviceFrame: React.FC = () => (
  <div className="device-frame print-hidden" aria-hidden="true">
    {CORNERS.map((corner) => (
      <span key={corner} className={`device-corner ${corner}`} />
    ))}
  </div>
);

export default DeviceFrame;
