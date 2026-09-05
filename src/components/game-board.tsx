"use client";

import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { findClue } from "@/lib/game";
import { useClientValue } from "@/lib/use-client-value";
import { useGame, type SyncStatus } from "@/lib/use-game";
import type { GameWithBoard, Team } from "@/lib/types";
import { ClueMedia } from "./clue-media";
import { Scoreboard } from "./scoreboard";
import { BibDot } from "./team-bib";

const statusLabel: Record<SyncStatus, string> = {
  connecting: "Kobler til",
  live: "Direkte",
  polling: "Oppdaterer",
};

const formatPoints = (value: number) => new Intl.NumberFormat("nb-NO").format(value);

export function GameBoard({ initial }: { initial: GameWithBoard }) {
  const { game, dispatch, status } = useGame(initial);
  const { board } = initial;
  const { state } = game;
  const [showQr, setShowQr] = useState(false);
  const origin = useClientValue(() => window.location.origin, "");

  const remoteUrl = `${origin}/spill/${game.code}/fjernkontroll`;
  const rows = useMemo(
    () => board.content.categories.reduce((max, category) => Math.max(max, category.clues.length), 0),
    [board],
  );
  const active = state.active ? findClue(board, state.active.clueId) : null;

  const advance = useCallback(() => {
    if (!state.active) return;
    if (state.active.phase === "question") void dispatch({ type: "showAnswer" });
    else void dispatch({ type: "closeClue" });
  }, [state.active, dispatch]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "Escape") {
        if (showQr) setShowQr(false);
        else if (state.active) void dispatch({ type: "closeClue" });
      } else if (event.key === " " || event.key === "Enter") {
        if (state.active) {
          event.preventDefault();
          advance();
        }
      } else if (event.key.toLowerCase() === "u") {
        void dispatch({ type: "undo" });
      } else if (event.key.toLowerCase() === "q") {
        setShowQr((value) => !value);
      } else if (event.key.toLowerCase() === "f") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen().catch(() => undefined);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, dispatch, showQr, state.active]);

  return (
    <main className="stage-spotlight relative flex h-dvh w-full flex-col overflow-hidden px-[2.2vw] pb-[1.6vh] pt-[1.4vh] text-cream">
      <header className="flex items-end justify-between gap-6 pb-[1.4vh]">
        <div className="min-w-0">
          <h1 className="font-display truncate text-[clamp(1.6rem,3.4vw,3.6rem)] font-medium leading-none tracking-tight">
            {board.title}
          </h1>
          {board.subtitle ? (
            <p className="font-display mt-1 truncate text-[clamp(0.9rem,1.4vw,1.5rem)] italic text-brass-light">{board.subtitle}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setShowQr(true)}
          className="brass-plate flex shrink-0 items-center gap-3 rounded-sm px-4 py-2 transition hover:brightness-110"
          aria-label="Vis QR-kode for fjernkontroll"
        >
          <span className="flex flex-col items-start leading-none">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] opacity-80">Romkode</span>
            <span className="numeral text-[clamp(1.3rem,2.4vw,2.4rem)] font-bold tracking-[0.12em]">{game.code}</span>
          </span>
          {origin ? (
            <span className="rounded-[3px] bg-cream p-1">
              <QRCodeSVG value={remoteUrl} size={44} bgColor="#fff2d6" fgColor="#2a1c08" level="M" />
            </span>
          ) : null}
        </button>
      </header>

      <section
        className="grid min-h-0 flex-1 gap-[0.8vw]"
        style={{
          gridTemplateColumns: `repeat(${board.content.categories.length}, minmax(0, 1fr))`,
          gridTemplateRows: `auto repeat(${rows}, minmax(0, 1fr))`,
        }}
        aria-label="Spillebrett"
      >
        {board.content.categories.map((category) => (
          <h2
            key={category.id}
            className="brass-plate flex min-h-[6vh] items-center justify-center rounded-sm px-2 text-center font-display text-[clamp(0.85rem,1.55vw,1.7rem)] font-semibold leading-[1.05] tracking-wide text-balance"
            style={{ gridRow: 1 }}
          >
            {category.title}
          </h2>
        ))}
        {Array.from({ length: rows }, (_, rowIndex) =>
          board.content.categories.map((category, columnIndex) => {
            const clue = category.clues[rowIndex];
            if (!clue) return <div key={`${category.id}-${rowIndex}`} style={{ gridRow: rowIndex + 2, gridColumn: columnIndex + 1 }} />;
            const used = state.used.includes(clue.id);
            const isActive = state.active?.clueId === clue.id;
            return (
              <button
                key={clue.id}
                type="button"
                onClick={() => dispatch({ type: "openClue", clueId: clue.id })}
                className={`numeral relative flex items-center justify-center rounded-sm text-[clamp(1.6rem,4.2vw,5rem)] transition-[transform,box-shadow,color,background] duration-300 ease-[var(--ease-stage)] ${
                  used && !isActive ? "panel-unlit hover:text-cream-dim" : "panel-lit hover:-translate-y-0.5 hover:brightness-110"
                } ${isActive ? "opacity-0" : ""}`}
                style={{ gridRow: rowIndex + 2, gridColumn: columnIndex + 1 }}
                aria-label={`${category.title}, ${formatPoints(clue.points)} poeng${used ? ", brukt" : ""}`}
              >
                {formatPoints(clue.points)}
              </button>
            );
          }),
        )}
      </section>

      <footer className="pt-[1.6vh]">
        <Scoreboard teams={state.teams} />
      </footer>

      <div className="pointer-events-none absolute bottom-1 right-[2.2vw] flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-cream-faint">
        <span
          aria-hidden
          className={`inline-block h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-[var(--bib-green)]" : "bg-brass"}`}
        />
        {statusLabel[status]}
      </div>

      {state.active && active ? (
        <ClueOverlay
          categoryTitle={active.categoryTitle}
          points={active.clue.points}
          question={active.clue.question}
          answer={active.clue.answer}
          phase={state.active.phase}
          teams={state.teams}
          clueId={active.clue.id}
          onAdvance={advance}
          onAward={(team, delta) => dispatch({ type: "award", teamId: team.id, delta, clueId: active.clue.id })}
          onBackToQuestion={() => dispatch({ type: "showQuestion" })}
          onClose={() => dispatch({ type: "closeClue" })}
        />
      ) : null}

      {showQr ? (
        <div
          role="dialog"
          aria-label="Koble til fjernkontroll"
          className="anim-spotlight absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-stage-deep/92 backdrop-blur-sm"
          onClick={() => setShowQr(false)}
        >
          <p className="font-display text-[clamp(1.6rem,3vw,3rem)] font-medium">Skann med mobilen</p>
          <div className="brass-plate rounded-md p-4">
            <div className="rounded-sm bg-cream p-4">
              {origin ? <QRCodeSVG value={remoteUrl} size={280} bgColor="#fff2d6" fgColor="#2a1c08" level="M" /> : null}
            </div>
          </div>
          <p className="text-center text-[clamp(1rem,1.6vw,1.5rem)] text-cream-dim">
            eller gå til <span className="text-cream">{origin.replace(/^https?:\/\//, "")}/koble-til</span> og skriv{" "}
            <span className="numeral text-brass-light tracking-[0.15em]">{game.code}</span>
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-cream-faint">Trykk hvor som helst for å lukke</p>
        </div>
      ) : null}
    </main>
  );
}

function ClueOverlay({
  categoryTitle,
  points,
  question,
  answer,
  phase,
  teams,
  onAdvance,
  onAward,
  onBackToQuestion,
  onClose,
}: {
  categoryTitle: string;
  points: number;
  question: GameWithBoard["board"]["content"]["categories"][number]["clues"][number]["question"];
  answer: GameWithBoard["board"]["content"]["categories"][number]["clues"][number]["answer"];
  phase: "question" | "answer";
  teams: Team[];
  clueId: string;
  onAdvance: () => void;
  onAward: (team: Team, delta: number) => void;
  onBackToQuestion: () => void;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={`${categoryTitle}, ${formatPoints(points)} poeng`}
      className="anim-spotlight absolute inset-0 z-20 flex flex-col bg-stage-deep/95 px-[3vw] pb-[2vh] pt-[2.4vh]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="brass-plate rounded-sm px-4 py-2 font-display text-[clamp(1rem,1.8vw,1.8rem)] font-semibold tracking-wide">
          {categoryTitle}
        </span>
        <span className="numeral text-[clamp(1.6rem,3.2vw,3.4rem)] text-lamp [text-shadow:0_0_24px_rgba(255,226,163,0.55)]">
          {formatPoints(points)}
        </span>
      </div>

      <button
        type="button"
        onClick={onAdvance}
        className="flex min-h-0 flex-1 cursor-pointer flex-col items-stretch justify-center py-[2vh] text-left"
        aria-label={phase === "question" ? "Vis svar" : "Lukk spørsmålet"}
      >
        {phase === "question" ? (
          <ClueMedia media={question} variant="question" />
        ) : (
          <div className="anim-envelope flex h-full min-h-0 flex-col">
            <div className="brass-rim flex min-h-0 flex-1 flex-col rounded-md bg-stage-floor/70 p-[2vh]">
              <span className="mb-[1vh] text-center text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-brass">Svar</span>
              <div className="min-h-0 flex-1">
                <ClueMedia media={answer} variant="answer" develop />
              </div>
            </div>
          </div>
        )}
      </button>

      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {phase === "answer"
            ? teams.map((team) => (
                <div key={team.id} className="brass-rim flex items-center gap-1 rounded-md bg-stage-floor/70 p-1">
                  <span className="flex items-center gap-2 px-2 text-[clamp(0.9rem,1.3vw,1.3rem)]">
                    <BibDot color={team.color} size={12} />
                    <span className="max-w-[12ch] truncate">{team.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAward(team, points)}
                    className="tap numeral rounded bg-[var(--bib-green)]/20 px-3 text-[clamp(0.9rem,1.3vw,1.3rem)] text-[var(--bib-green)] hover:bg-[var(--bib-green)]/35"
                    aria-label={`Gi ${formatPoints(points)} poeng til ${team.name}`}
                  >
                    +{formatPoints(points)}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAward(team, -points)}
                    className="tap numeral rounded bg-[var(--bib-red)]/20 px-3 text-[clamp(0.9rem,1.3vw,1.3rem)] text-[var(--bib-red)] hover:bg-[var(--bib-red)]/35"
                    aria-label={`Trekk ${formatPoints(points)} poeng fra ${team.name}`}
                  >
                    −{formatPoints(points)}
                  </button>
                </div>
              ))
            : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {phase === "answer" ? (
            <button type="button" onClick={onBackToQuestion} className="tap rounded-md px-4 text-cream-dim hover:text-cream">
              Tilbake til spørsmålet
            </button>
          ) : null}
          <button
            type="button"
            onClick={phase === "question" ? onAdvance : onClose}
            className="brass-plate tap rounded-md px-6 text-[clamp(1rem,1.4vw,1.4rem)] font-semibold"
          >
            {phase === "question" ? "Vis svar" : "Lukk"}
          </button>
        </div>
      </div>
    </div>
  );
}
