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
    if (reduce) {
      setShown(to);
      return;
    }
    const start = performance.now();
    const duration = 700;
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
  const lastScores = useRef<Record<string, number>>({});
  useEffect(() => {
    for (const team of teams) {
      const before = lastScores.current[team.id];
      if (before !== undefined && before !== team.score) setFlashId(team.id);
      lastScores.current[team.id] = team.score;
    }
    if (flashId) {
      const timer = window.setTimeout(() => setFlashId(null), 900);
      return () => window.clearTimeout(timer);
    }
  }, [teams, flashId]);

  return (
    <ol className={`grid gap-3 ${compact ? "grid-cols-2" : ""}`} style={compact ? undefined : { gridTemplateColumns: `repeat(${ranked.length}, minmax(0, 1fr))` }}>
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
                className={`truncate font-display ${compact ? "text-lg" : "text-[clamp(1rem,1.6vw,1.6rem)]"} font-medium tracking-wide`}
              >
                {team.name}
              </span>
            </div>
            <span className={`numeral ${compact ? "text-3xl" : "text-[clamp(2rem,4vw,4.2rem)]"} leading-none`}>
              <RollingScore value={team.score} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}
