import React from "react";
import Panel from "../os/Panel";
import { EDUCATION } from "../../data/resume";
import { SECTION_BY_ID } from "../../data/sections";

const Education: React.FC = () => (
  <Panel section={SECTION_BY_ID.education}>
    <div className="space-y-5">
      {EDUCATION.map((entry) => (
        <article
          key={entry.id}
          className="flex flex-col gap-2 border-t border-zelda-light-blue/15 pt-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
        >
          <div className="flex items-start gap-3">
            {/* Placeholder keeps degrees aligned when an institution has no logo. */}
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                entry.logo ? "bg-white/10" : ""
              }`}
            >
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt=""
                  className="h-6 w-6 object-contain"
                  aria-hidden="true"
                />
              )}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-xl text-zelda-gold">
                {entry.degree}
              </h3>
              {entry.institutionUrl ? (
                <a
                  href={entry.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zelda-light-blue transition-colors hover:text-zelda-gold"
                >
                  {entry.institution}
                </a>
              ) : (
                <p className="text-zelda-light-blue">{entry.institution}</p>
              )}
            </div>
          </div>

          <p className="shrink-0 whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-zelda-light-blue/80 sm:text-right">
            {entry.start} &ndash; {entry.end}
          </p>
        </article>
      ))}
    </div>
  </Panel>
);

export default Education;
