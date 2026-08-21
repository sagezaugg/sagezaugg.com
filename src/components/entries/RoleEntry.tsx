import React from "react";
import type { Role } from "../../types/resume";

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li
        key={item}
        className="relative pl-5 text-sm leading-relaxed text-zelda-text sm:text-base"
      >
        <span
          className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rotate-45 bg-zelda-gold/70"
          aria-hidden="true"
        />
        {item}
      </li>
    ))}
  </ul>
);

interface RoleEntryProps {
  role: Role;
  /** Dividers belong to the list, not the entry, so the caller supplies them. */
  className?: string;
}

const RoleEntry: React.FC<RoleEntryProps> = ({ role, className = "" }) => (
  <article className={className}>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex items-start gap-3">
        {/* Placeholder keeps role titles aligned when an org has no logo. */}
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${
            role.logo ? "bg-white/10" : ""
          }`}
        >
          {role.logo && (
            <img
              src={role.logo}
              alt=""
              className="h-6 w-6 object-contain"
              aria-hidden="true"
            />
          )}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-zelda-gold sm:text-2xl">
            {role.title}
          </h3>
          {role.organizationUrl ? (
            <a
              href={role.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zelda-light-blue transition-colors hover:text-zelda-gold"
            >
              {role.organization}
            </a>
          ) : (
            <p className="text-zelda-light-blue">{role.organization}</p>
          )}
        </div>
      </div>

      <div className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-zelda-light-blue/80 sm:text-right">
        <p className="whitespace-nowrap">
          {role.start} &ndash; {role.end}
        </p>
        <p className="text-zelda-light-blue/55">{role.location}</p>
      </div>
    </div>

    <div className="mt-4 space-y-4">
      {role.groups.map((group, index) => (
        <div key={group.label ?? `group-${index}`}>
          {group.label && (
            <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zelda-light-blue/70">
              {group.label}
            </h4>
          )}
          <Bullets items={group.bullets} />
        </div>
      ))}
    </div>
  </article>
);

export default RoleEntry;
