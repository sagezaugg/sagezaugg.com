import React from "react";
import { Card } from "../common/Card";
import { TimelineItemInterface } from "../../utils/aboutConstants";

interface TimelineItemProps {
  item: TimelineItemInterface;
  index: number;
}

const OrganizationLogo: React.FC<{ logo?: string; name: string }> = ({
  logo,
  name,
}) => {
  if (!logo) return null;

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-8 h-8 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isCurrent = item.endYear === "Present";
  const isSingleYear = item.startYear === item.endYear;

  return (
    <Card index={index} className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="w-full sm:w-32 flex-shrink-0">
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
            <span
              className="text-zelda-gold font-serif text-2xl tracking-tight"
              aria-label={`From ${item.startYear} to ${
                isCurrent ? "present" : item.endYear
              }`}
            >
              {item.startYear}
            </span>
            {!isSingleYear && (
              <>
                <span className="text-zelda-gold font-serif text-xl sm:hidden">
                  -
                </span>
                <span className="text-zelda-gold font-serif text-xl tracking-tight sm:mt-1">
                  {isCurrent ? "Present" : item.endYear}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <OrganizationLogo
              logo={item.organization.logo}
              name={item.organization.name}
            />
            <div>
              <h3 className="text-xl font-serif text-zelda-gold">
                {item.title}
              </h3>
              {item.organization.website ? (
                <a
                  href={item.organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zelda-light-blue hover:text-zelda-gold transition-colors text-sm sm:text-base"
                >
                  {item.organization.name}
                </a>
              ) : (
                <span className="text-zelda-light-blue text-sm sm:text-base">
                  {item.organization.name}
                </span>
              )}
            </div>
          </div>
          <p className="text-zelda-light-blue text-sm sm:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </Card>
  );
};
