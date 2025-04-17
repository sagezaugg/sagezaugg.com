import React from 'react';
import { TimelineItem, TimelineItem as TimelineItemType } from './TimelineItem';

interface TimelineProps {
  items: TimelineItemType[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => (
  <div className="space-y-8">
    {items.map((item, index) => (
      <TimelineItem key={index} item={item} index={index} />
    ))}
  </div>
); 