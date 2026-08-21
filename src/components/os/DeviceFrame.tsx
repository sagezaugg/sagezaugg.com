import React from "react";

const CORNERS = [
  "left-1.5 top-1.5 border-l-2 border-t-2 rounded-tl-sm",
  "right-1.5 top-1.5 border-r-2 border-t-2 rounded-tr-sm",
  "left-1.5 bottom-1.5 border-l-2 border-b-2 rounded-bl-sm",
  "right-1.5 bottom-1.5 border-r-2 border-b-2 rounded-br-sm",
];

/** The bezel of the slate: a quiet gold edge with corner brackets. */
const DeviceFrame: React.FC = () => (
  <div className="device-frame print-hidden" aria-hidden="true">
    {CORNERS.map((corner) => (
      <span key={corner} className={`device-corner ${corner}`} />
    ))}
  </div>
);

export default DeviceFrame;
