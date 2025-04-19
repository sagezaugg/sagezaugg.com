import React from "react";
import { TimelineItem } from "./TimelineItem";
import { TimelineItemInterface } from "../../utils/aboutConstants";

interface TimelineProps {
  items: TimelineItemInterface[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => (
  <div className="space-y-8">
    {items.map((item, index) => (
      <TimelineItem key={index} item={item} index={index} />
    ))}
  </div>
);
