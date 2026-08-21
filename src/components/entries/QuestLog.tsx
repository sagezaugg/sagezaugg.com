import React from "react";
import { motion } from "framer-motion";
import type { Role } from "../../types/resume";
import {
  hasPlayedQuestLogIntro,
  questStops,
  type QuestStop,
} from "../../data/questLog";
import { railDraw, stopEntrance } from "../launcher/motion";

const RoleStop: React.FC<{ role: Role }> = ({ role }) => (
  <article>
    <p className="font-mono text-[11px] tracking-[0.12em] text-zelda-light-blue/70">
      {role.start} &ndash; {role.end}
      <span className="text-zelda-light-blue/45"> · {role.location}</span>
    </p>
    <div className="mt-1 flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ${
          role.logo ? "bg-white/10" : ""
        }`}
      >
        {role.logo && (
          <img
            src={role.logo}
            alt=""
            className="h-5 w-5 object-contain"
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
    <p className="mt-3 text-sm leading-relaxed text-zelda-text sm:text-base">
      {role.summary}
    </p>
  </article>
);

const LifeStop: React.FC<{ event: QuestStop & { kind: "life" } }> = ({
  event: { event },
}) => (
  <article>
    <p className="font-mono text-[11px] tracking-[0.12em] text-zelda-light-blue/70">
      {event.date}
      {event.location && (
        <span className="text-zelda-light-blue/45"> · {event.location}</span>
      )}
    </p>
    <h3 className="mt-1 font-serif text-xl text-zelda-light-blue">{event.title}</h3>
    {event.note && <p className="mt-2 text-sm text-zelda-text">{event.note}</p>}
  </article>
);

const QuestLog: React.FC = () => {
  const stops = questStops();
  const skipIntro = hasPlayedQuestLogIntro();

  return (
    <ol className="relative">
      <span
        className="pointer-events-none absolute bottom-3 left-0 top-3 flex w-[2.25rem] justify-center"
        aria-hidden="true"
      >
        <motion.span
          className="quest-enter h-full w-px origin-top bg-zelda-gold/25"
          initial={skipIntro ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={railDraw}
        />
      </span>
      {stops.map((stop, index) => {
        const isLife = stop.kind === "life";
        return (
          <li
            key={stop.kind === "role" ? stop.role.id : stop.event.id}
            className={`relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 ${
              index === stops.length - 1 ? "pb-0" : "pb-10"
            }`}
          >
            <span className="relative z-10 flex justify-center pt-1.5" aria-hidden="true">
              <motion.span
                className="quest-enter flex justify-center"
                initial={skipIntro ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={stopEntrance(index)}
              >
                <span
                  className={
                    isLife
                      ? "mt-1 h-2.5 w-2.5 rotate-45 border border-zelda-light-blue/80 bg-zelda-dark"
                      : "h-3.5 w-3.5 rotate-45 bg-zelda-gold shadow-rune-active"
                  }
                />
              </motion.span>
            </span>
            <motion.div
              className="quest-enter"
              initial={skipIntro ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={stopEntrance(index)}
            >
              {stop.kind === "role" ? (
                <RoleStop role={stop.role} />
              ) : (
                <LifeStop event={stop} />
              )}
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
};

export default QuestLog;
