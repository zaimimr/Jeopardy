"use client";

import { useEffect, useRef, useState } from "react";
import { rankedTeams } from "@/lib/game";
import type { Team } from "@/lib/types";
import { BibDot, bibVar } from "./team-bib";

const formatScore = (value: number) => new Intl.NumberFormat("nb-NO").format(value);

function RollingScore({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const previous = useRef(value);
  useEffect(() => {
    const from = previous.current;
    const to = value;
    previous.current = value;
    if (from === to) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = reduce ? 1 : 700;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(from + (to - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{formatScore(shown)}</>;
}

export function Scoreboard({ teams, compact = false }: { teams: Team[]; compact?: boolean }) {
  const ranked = rankedTeams(teams);
  const top = ranked[0]?.score ?? 0;
  const [flashId, setFlashId] = useState<string | null>(null);
  const [seenTeams, setSeenTeams] = useState(teams);
  if (seenTeams !== teams) {
    setSeenTeams(teams);
    const changed = teams.find((team) => {
      const before = seenTeams.find((seen) => seen.id === team.id);
      return before !== undefined && before.score !== team.score;
    });
    if (changed) setFlashId(changed.id);
  }
  useEffect(() => {
    if (!flashId) return;
    const timer = window.setTimeout(() => setFlashId(null), 900);
    return () => window.clearTimeout(timer);
  }, [flashId]);

  return (
    <ol
      className={`grid ${compact ? "grid-cols-2 gap-3" : ranked.length > 5 ? "gap-2" : "gap-3"}`}
      style={compact ? undefined : { gridTemplateColumns: `repeat(${ranked.length}, minmax(0, 1fr))` }}
    >
      {ranked.map((team, index) => {
        const leader = index === 0 && team.score === top && ranked.filter((t) => t.score === top).length === 1;
        return (
          <li
            key={team.id}
            className={`relative flex min-w-0 flex-col justify-between gap-1 overflow-hidden rounded-md px-4 py-3 ${
              leader ? "brass-plate" : "brass-rim bg-stage-floor/70 text-cream"
            } ${flashId === team.id ? "anim-flash" : ""}`}
            style={{ boxShadow: leader ? undefined : `inset 0 -3px 0 ${bibVar[team.color]}` }}
          >
            <div className="flex min-w-0 items-center gap-2">
              <BibDot color={team.color} size={compact ? 12 : 16} />
              <span
                className={`truncate font-display ${compact ? "text-lg" : ranked.length > 5 ? "text-[clamp(0.95rem,1.3vw,1.4rem)]" : "text-[clamp(1.1rem,1.7vw,1.7rem)]"} tracking-wide`}
              >
                {team.name}
              </span>
            </div>
            <span className={`numeral ${compact ? "text-3xl" : ranked.length > 5 ? "text-[clamp(1.6rem,3vw,3.2rem)]" : "text-[clamp(2rem,4vw,4.2rem)]"} leading-none`}>
              <RollingScore value={team.score} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}
