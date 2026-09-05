"use client";

import Link from "next/link";
import { useState } from "react";
import { findClue, MAX_TEAMS, rankedTeams } from "@/lib/game";
import { BIB_COLORS, type GameWithBoard, type Team } from "@/lib/types";
import { useGame, type SyncStatus } from "@/lib/use-game";
import { BibDot, bibLabel, bibVar } from "./team-bib";
import { Button } from "./ui";

const formatPoints = (value: number) => new Intl.NumberFormat("nb-NO").format(value);

const statusLabel: Record<SyncStatus, string> = {
  connecting: "Kobler til skjermen",
  live: "Koblet til skjermen",
  polling: "Oppdaterer hvert par sekund",
};

type Tab = "spill" | "lag";

export function Remote({ initial }: { initial: GameWithBoard }) {
  const { game, dispatch, status, error, pending } = useGame(initial);
  const { board } = initial;
  const { state } = game;
  const [chosenTab, setTab] = useState<Tab>("spill");
  const tab: Tab = state.active ? "spill" : chosenTab;
  const [confirmReset, setConfirmReset] = useState(false);
  const active = state.active ? findClue(board, state.active.clueId) : null;
  const lastEvent = state.log.at(-1);
  const lastTeam = lastEvent ? state.teams.find((team) => team.id === lastEvent.teamId) : null;

  return (
    <main className="stage-spotlight flex min-h-dvh flex-col text-cream">
      <header className="flex items-center justify-between gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="min-w-0">
          <p className="font-display truncate text-xl font-medium leading-tight">{board.title}</p>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream-dim">
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-[var(--bib-green)]" : "bg-brass"}`}
            />
            {statusLabel[status]}
          </p>
        </div>
        <span className="brass-plate numeral rounded-sm px-3 py-1.5 text-lg font-bold tracking-[0.15em]">{game.code}</span>
      </header>

      {error ? <p className="mx-4 rounded-md bg-[var(--bib-red)]/20 px-3 py-2 text-sm text-[var(--bib-red)]">{error}</p> : null}

      <div className="mx-4 mt-2 grid grid-cols-2 rounded-md bg-stage-deep/70 p-1 brass-rim" role="tablist">
        {(["spill", "lag"] as Tab[]).map((value) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={`tap rounded text-[15px] font-semibold uppercase tracking-[0.16em] transition ${
              tab === value ? "brass-plate" : "text-cream-dim"
            }`}
          >
            {value === "spill" ? "Spill" : `Lag (${state.teams.length})`}
          </button>
        ))}
      </div>

      {tab === "spill" ? (
        <section className="flex flex-1 flex-col gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          {state.active && active ? (
            <ActiveClue
              categoryTitle={active.categoryTitle}
              points={active.clue.points}
              phase={state.active.phase}
              teams={state.teams}
              questionText={active.clue.question.text}
              answerText={active.clue.answer.text}
              onShowAnswer={() => dispatch({ type: "showAnswer" })}
              onShowQuestion={() => dispatch({ type: "showQuestion" })}
              onClose={() => dispatch({ type: "closeClue" })}
              onAward={(team, delta) => dispatch({ type: "award", teamId: team.id, delta, clueId: active.clue.id })}
              pending={pending}
            />
          ) : (
            <MiniBoard board={board} used={state.used} onPick={(clueId) => dispatch({ type: "openClue", clueId })} onToggleUsed={(clueId) => dispatch({ type: "toggleUsed", clueId })} />
          )}

          <div className="mt-auto flex flex-col gap-3">
            <ol className="grid grid-cols-2 gap-2">
              {rankedTeams(state.teams).map((team, index) => (
                <li
                  key={team.id}
                  className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 ${index === 0 ? "brass-plate" : "brass-rim bg-stage-floor/70"}`}
                  style={index === 0 ? undefined : { boxShadow: `inset 0 -3px 0 ${bibVar[team.color]}` }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <BibDot color={team.color} size={10} />
                    <span className="truncate text-[15px]">{team.name}</span>
                  </span>
                  <span className="numeral text-xl">{formatPoints(team.score)}</span>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between gap-3 text-sm text-cream-dim">
              <span className="truncate">
                {lastEvent && lastTeam
                  ? `Sist: ${lastEvent.delta > 0 ? "+" : "−"}${formatPoints(Math.abs(lastEvent.delta))} til ${lastTeam.name}`
                  : "Ingen poeng gitt ennå"}
              </span>
              <Button variant="ghost" className="shrink-0 px-3 text-[15px]" disabled={!lastEvent} onClick={() => dispatch({ type: "undo" })}>
                Angre
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-1 flex-col gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <ul className="flex flex-col gap-3">
            {state.teams.map((team) => (
              <TeamEditor
                key={team.id}
                team={team}
                canRemove={state.teams.length > 1}
                onRename={(name) => dispatch({ type: "renameTeam", teamId: team.id, name })}
                onColor={(color) => dispatch({ type: "setTeamColor", teamId: team.id, color })}
                onScore={(score) => dispatch({ type: "setScore", teamId: team.id, score })}
                onRemove={() => dispatch({ type: "removeTeam", teamId: team.id })}
              />
            ))}
          </ul>
          <Button variant="outline" disabled={state.teams.length >= MAX_TEAMS} onClick={() => dispatch({ type: "addTeam" })}>
            Legg til lag
          </Button>
          <div className="mt-auto flex flex-col gap-2 border-t border-brass/20 pt-4">
            {confirmReset ? (
              <div className="flex flex-col gap-2 rounded-md bg-[var(--bib-red)]/12 p-3">
                <p className="text-sm">Nullstill poeng og åpne alle spørsmål igjen?</p>
                <div className="flex gap-2">
                  <Button variant="velvet" className="flex-1" onClick={() => { void dispatch({ type: "reset" }); setConfirmReset(false); }}>
                    Ja, nullstill
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => setConfirmReset(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" onClick={() => setConfirmReset(true)}>
                Nullstill spillet
              </Button>
            )}
            <Link href={`/spill/${game.code}`} className="text-center text-sm text-cream-dim underline-offset-4 hover:text-cream hover:underline">
              Åpne storskjermen på denne enheten
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

function MiniBoard({
  board,
  used,
  onPick,
  onToggleUsed,
}: {
  board: GameWithBoard["board"];
  used: string[];
  onPick: (clueId: string) => void;
  onToggleUsed: (clueId: string) => void;
}) {
  const rows = board.content.categories.reduce((max, category) => Math.max(max, category.clues.length), 0);
  const remaining = board.content.categories.reduce(
    (sum, category) => sum + category.clues.filter((clue) => !used.includes(clue.id)).length,
    0,
  );
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.18em] text-cream-dim">
        Velg spørsmål · {remaining} igjen · hold inne for å merke som brukt
      </p>
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${board.content.categories.length}, minmax(0, 1fr))`,
        }}
      >
        {board.content.categories.map((category) => (
          <div key={category.id} className="brass-plate flex min-h-9 items-center justify-center rounded-sm px-1 text-center font-display text-[11px] font-semibold leading-tight">
            <span className="line-clamp-2">{category.title}</span>
          </div>
        ))}
        {Array.from({ length: rows }, (_, rowIndex) =>
          board.content.categories.map((category) => {
            const clue = category.clues[rowIndex];
            if (!clue) return <div key={`${category.id}-${rowIndex}`} />;
            const isUsed = used.includes(clue.id);
            return (
              <LongPressButton
                key={clue.id}
                className={`numeral tap flex items-center justify-center rounded-sm text-base ${isUsed ? "panel-unlit" : "panel-lit"}`}
                onTap={() => onPick(clue.id)}
                onLongPress={() => onToggleUsed(clue.id)}
                aria-label={`${category.title}, ${formatPoints(clue.points)}${isUsed ? ", brukt" : ""}`}
              >
                {formatPoints(clue.points)}
              </LongPressButton>
            );
          }),
        )}
      </div>
    </div>
  );
}

function LongPressButton({
  onTap,
  onLongPress,
  children,
  className,
  ...rest
}: {
  onTap: () => void;
  onLongPress: () => void;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const [timer, setTimer] = useState<number | null>(null);
  const [fired, setFired] = useState(false);
  const start = () => {
    setFired(false);
    setTimer(
      window.setTimeout(() => {
        setFired(true);
        onLongPress();
        if (navigator.vibrate) navigator.vibrate(20);
      }, 550),
    );
  };
  const end = () => {
    if (timer) window.clearTimeout(timer);
    setTimer(null);
  };
  return (
    <button
      type="button"
      className={className}
      onPointerDown={start}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
      onContextMenu={(event) => event.preventDefault()}
      onClick={() => {
        if (!fired) onTap();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function ActiveClue({
  categoryTitle,
  points,
  phase,
  teams,
  questionText,
  answerText,
  onShowAnswer,
  onShowQuestion,
  onClose,
  onAward,
  pending,
}: {
  categoryTitle: string;
  points: number;
  phase: "question" | "answer";
  teams: Team[];
  questionText?: string;
  answerText?: string;
  onShowAnswer: () => void;
  onShowQuestion: () => void;
  onClose: () => void;
  onAward: (team: Team, delta: number) => void;
  pending: boolean;
}) {
  return (
    <div className="anim-envelope flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="brass-plate truncate rounded-sm px-3 py-1.5 font-display text-base font-semibold">{categoryTitle}</span>
        <span className="numeral text-3xl text-lamp">{formatPoints(points)}</span>
      </div>
      <div className="brass-rim flex flex-1 flex-col items-center justify-center gap-5 rounded-md bg-stage-floor/70 px-5 py-8 text-center">
        <p className={`text-balance leading-[1.15] ${phase === "answer" ? "text-[clamp(1.25rem,5vw,2rem)] text-cream-dim" : "text-[clamp(1.6rem,7vw,3rem)] font-medium"}`}>
          {questionText?.trim() || <span className="italic text-cream-dim">Bilde eller tomt</span>}
        </p>
        {phase === "answer" ? (
          <p className="font-display text-balance text-[clamp(2rem,9vw,3.6rem)] font-medium leading-[1.05] text-brass-light">
            {answerText?.trim() || <span className="italic text-cream-dim">Bilde eller tomt</span>}
          </p>
        ) : null}
      </div>

      {phase === "question" ? (
        <Button variant="outline" className="min-h-12 text-base" onClick={onShowAnswer} disabled={pending}>
          Vis svar på skjermen
        </Button>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {teams.map((team) => (
              <li key={team.id} className="brass-rim flex items-center gap-2 rounded-md bg-stage-floor/70 p-1.5">
                <span className="flex min-w-0 flex-1 items-center gap-2 px-2">
                  <BibDot color={team.color} size={12} />
                  <span className="truncate text-[15px]">{team.name}</span>
                  <span className="numeral ml-auto text-cream-dim">{formatPoints(team.score)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onAward(team, points)}
                  className="tap numeral min-w-[4.5rem] rounded bg-[var(--bib-green)]/22 px-3 text-lg text-[var(--bib-green)] active:bg-[var(--bib-green)]/40"
                  aria-label={`Riktig: ${team.name}`}
                >
                  +{formatPoints(points)}
                </button>
                <button
                  type="button"
                  onClick={() => onAward(team, -points)}
                  className="tap numeral min-w-[4.5rem] rounded bg-[var(--bib-red)]/22 px-3 text-lg text-[var(--bib-red)] active:bg-[var(--bib-red)]/40"
                  aria-label={`Feil: ${team.name}`}
                >
                  −{formatPoints(points)}
                </button>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <Button variant="ghost" onClick={onShowQuestion}>
              Tilbake
            </Button>
            <Button className="min-h-14 text-lg" onClick={onClose}>
              Lukk og tilbake til brettet
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function TeamEditor({
  team,
  canRemove,
  onRename,
  onColor,
  onScore,
  onRemove,
}: {
  team: Team;
  canRemove: boolean;
  onRename: (name: string) => void;
  onColor: (color: Team["color"]) => void;
  onScore: (score: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="brass-rim flex flex-col gap-3 rounded-md bg-stage-floor/70 p-3">
      <div className="flex items-center gap-2">
        <BibDot color={team.color} size={16} />
        <input
          key={team.name}
          defaultValue={team.name}
          onBlur={(event) => {
            const name = event.target.value;
            if (name.trim() && name !== team.name) onRename(name);
          }}
          onKeyDown={(event) => event.key === "Enter" && (event.target as HTMLInputElement).blur()}
          maxLength={24}
          aria-label="Lagnavn"
          className="min-w-0 flex-1 rounded bg-stage-deep/70 px-3 py-2 font-display text-lg text-cream"
        />
        <input
          key={team.score}
          defaultValue={String(team.score)}
          inputMode="numeric"
          onKeyDown={(event) => event.key === "Enter" && (event.target as HTMLInputElement).blur()}
          onBlur={(event) => {
            const parsed = Number.parseInt(event.target.value.replace(/[^\d-]/g, ""), 10);
            if (Number.isFinite(parsed) && parsed !== team.score) onScore(parsed);
            else event.target.value = String(team.score);
          }}
          aria-label="Poeng"
          className="numeral w-24 rounded bg-stage-deep/70 px-3 py-2 text-right text-lg text-cream"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2" role="radiogroup" aria-label="Lagfarge">
          {BIB_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={team.color === color}
              aria-label={bibLabel[color]}
              onClick={() => onColor(color)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${team.color === color ? "ring-2 ring-brass-light" : ""}`}
            >
              <BibDot color={color} size={18} />
            </button>
          ))}
        </div>
        <Button variant="ghost" className="px-3 text-[15px]" disabled={!canRemove} onClick={onRemove}>
          Fjern
        </Button>
      </div>
    </li>
  );
}
