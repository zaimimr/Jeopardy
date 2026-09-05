"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBoardForEdit, saveBoard } from "@/lib/actions/boards";
import { createCategory, createClue, hasMedia, MAX_COLUMNS, MAX_ROWS, POINT_STEP } from "@/lib/board";
import { createGame } from "@/lib/actions/games";
import { localBoardKey, rememberBoard } from "@/lib/local-boards";
import { themeList, themeStyle, type ThemeId } from "@/lib/themes";
import { useClueDrag, type Slot } from "@/lib/use-clue-drag";
import { useClientValue, useOrigin } from "@/lib/use-client-value";
import type { Board, BoardContent, Category, Clue, Media } from "@/lib/types";
import { uploadImage } from "@/lib/upload";
import { SiteHeader } from "./site-header";
import { Button, Input, Textarea } from "./ui";

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

type Selection = string | null;

export function BoardEditor({ boardId, keyFromUrl }: { boardId: string; keyFromUrl: string | null }) {
  const router = useRouter();
  const key = useClientValue(() => keyFromUrl ?? localBoardKey(boardId), keyFromUrl);
  const [board, setBoard] = useState<Board | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>(null);
  const [starting, setStarting] = useState(false);
  const saveTimer = useRef<number | null>(null);
  const latest = useRef<Board | null>(null);

  useEffect(() => {
    const resolved = key;
    if (!resolved) return;
    getBoardForEdit(boardId, resolved)
      .then((loaded) => {
        if (!loaded) {
          setLoadError("Fant ikke brettet, eller redigeringsnøkkelen er feil.");
          return;
        }
        setBoard(loaded);
        latest.current = loaded;
        rememberBoard({ id: loaded.id, title: loaded.title, key: resolved });
        if (keyFromUrl) router.replace(`/brett/${boardId}/rediger`);
      })
      .catch((caught: unknown) => setLoadError(caught instanceof Error ? caught.message : "Klarte ikke å laste brettet."));
  }, [boardId, key, keyFromUrl, router]);

  const persist = useCallback(async () => {
    const current = latest.current;
    if (!current || !key) return;
    setSaveState("saving");
    try {
      const saved = await saveBoard(current.id, key, { title: current.title, subtitle: current.subtitle, content: current.content });
      rememberBoard({ id: saved.id, title: saved.title, key });
      setSaveState((state) => (state === "saving" ? "saved" : state));
      setSaveError(null);
    } catch (caught) {
      setSaveState("error");
      setSaveError(caught instanceof Error ? caught.message : "Lagring feilet.");
    }
  }, [key]);

  const update = useCallback(
    (mutate: (draft: Board) => Board) => {
      setBoard((current) => {
        if (!current) return current;
        const next = mutate(current);
        latest.current = next;
        return next;
      });
      setSaveState("dirty");
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => void persist(), 900);
    },
    [persist],
  );

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (saveState === "dirty" || saveState === "saving") event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [saveState]);

  const updateContent = (mutate: (content: BoardContent) => BoardContent) =>
    update((draft) => ({ ...draft, content: mutate(draft.content) }));

  const updateClue = (clueId: string, mutate: (clue: Clue) => Clue) =>
    updateContent((content) => ({
      ...content,
      categories: content.categories.map((category) => ({
        ...category,
        clues: category.clues.map((clue) => (clue.id === clueId ? mutate(clue) : clue)),
      })),
    }));

  const moveClue = (from: Slot, to: Slot) =>
    updateContent((content) => {
      const source = content.categories.find((category) => category.id === from.categoryId);
      const target = content.categories.find((category) => category.id === to.categoryId);
      if (!source?.clues[from.row] || !target?.clues[to.row]) return content;
      if (source.id === target.id) {
        const values = source.clues.map((clue) => clue.points);
        const clues = [...source.clues];
        const [moved] = clues.splice(from.row, 1);
        clues.splice(to.row, 0, moved);
        const reordered = clues.map((clue, index) => ({ ...clue, points: values[index] }));
        return { ...content, categories: content.categories.map((c) => (c.id === source.id ? { ...c, clues: reordered } : c)) };
      }
      const moved = source.clues[from.row];
      const displaced = target.clues[to.row];
      const swap = (category: Category) => {
        if (category.id === source.id) {
          return { ...category, clues: category.clues.map((clue, index) => (index === from.row ? { ...displaced, points: clue.points } : clue)) };
        }
        if (category.id === target.id) {
          return { ...category, clues: category.clues.map((clue, index) => (index === to.row ? { ...moved, points: clue.points } : clue)) };
        }
        return category;
      };
      return { ...content, categories: content.categories.map(swap) };
    });

  const columnPoints = (categoryId: string) =>
    board?.content.categories.find((category) => category.id === categoryId)?.clues.map((clue) => clue.points) ?? [];

  const { drag, registerCell, handleProps, cellStyle, isDropTarget, pointsAtRow } = useClueDrag({ onMove: moveClue, columnPoints });

  const rows = useMemo(() => board?.content.categories.reduce((max, c) => Math.max(max, c.clues.length), 0) ?? 0, [board]);

  const start = async () => {
    if (!board) return;
    setStarting(true);
    try {
      if (saveState === "dirty") await persist();
      const { id } = await createGame(board.id);
      router.push(`/spill/${id}`);
    } catch (caught) {
      setSaveError(caught instanceof Error ? caught.message : "Klarte ikke å starte spillet.");
      setStarting(false);
    }
  };

  const missingKey = key === null;
  if (loadError || missingKey) {
    return (
      <div className="stage-spotlight flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4 px-5 pb-16">
          <h1 className="font-display text-3xl font-medium">Kan ikke redigere</h1>
          <p className="text-lg text-cream-dim">
            {loadError ?? "Du mangler redigeringsnøkkelen til dette brettet. Åpne redigeringslenken du fikk da du lagde brettet."}
          </p>
          <Link href={`/brett/${boardId}`} className="text-brass-light underline-offset-4 hover:underline">
            Se brettet uten å redigere
          </Link>
        </main>
      </div>
    );
  }

  if (!board || !key) {
    return (
      <div className="stage-spotlight flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center text-cream-dim">Laster brettet…</main>
      </div>
    );
  }

  const selectedCategory = selection ? board.content.categories.find((c) => c.clues.some((clue) => clue.id === selection)) ?? null : null;
  const selected = selectedCategory?.clues.find((clue) => clue.id === selection) ?? null;

  return (
    <div style={themeStyle(board.content.theme)} className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader
        right={
          <>
            <SaveIndicator state={saveState} />
            <Link href={`/brett/${board.id}`} className="tap hidden items-center rounded-md px-3 text-cream-dim hover:text-cream sm:inline-flex">
              Forhåndsvis
            </Link>
            <Button onClick={start} disabled={starting} className="px-5">
              {starting ? "Starter…" : "Start spill"}
            </Button>
          </>
        }
      />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 pb-24 pt-2 md:px-8">
        {saveError ? <p className="rounded-md bg-[var(--bib-red)]/15 px-4 py-2 text-[var(--bib-red)]">{saveError}</p> : null}

        <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <label className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.18em] text-brass">Tittel</span>
            <input
              value={board.title}
              onChange={(e) => update((d) => ({ ...d, title: e.target.value }))}
              maxLength={80}
              className="w-full rounded-md brass-rim bg-stage-deep/70 px-4 py-3 font-display text-3xl text-cream"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.18em] text-brass">Undertittel</span>
            <Input value={board.subtitle ?? ""} onChange={(e) => update((d) => ({ ...d, subtitle: e.target.value || null }))} maxLength={120} placeholder="Valgfri" />
          </label>
        </section>

        <ShareLink boardId={board.id} editKey={key} />

        <ThemePicker value={board.content.theme ?? "midnatt"} onChange={(theme) => updateContent((c) => ({ ...c, theme }))} />

        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-medium">Brettet</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Button
                variant="outline"
                className="px-3 text-sm"
                disabled={board.content.categories.length >= MAX_COLUMNS}
                onClick={() => updateContent((c) => ({ ...c, categories: [...c.categories, createCategory(`Kategori ${c.categories.length + 1}`, rows || 1)] }))}
              >
                + Kategori
              </Button>
              <Button
                variant="outline"
                className="px-3 text-sm"
                disabled={rows >= MAX_ROWS}
                onClick={() =>
                  updateContent((c) => ({
                    ...c,
                    categories: c.categories.map((category) => ({
                      ...category,
                      clues: [...category.clues, createClue((category.clues.length + 1) * POINT_STEP)],
                    })),
                  }))
                }
              >
                + Rad
              </Button>
              <Button
                variant="ghost"
                className="px-3 text-sm"
                disabled={rows <= 1}
                onClick={() => {
                  updateContent((c) => ({ ...c, categories: c.categories.map((category) => ({ ...category, clues: category.clues.slice(0, -1) })) }));
                  setSelection(null);
                }}
              >
                − Siste rad
              </Button>
            </div>
          </div>
          <p className="text-sm text-cream-dim">Klikk på en rute for å skrive spørsmål og svar. Dra i håndtaket for å flytte ruta opp eller ned - poengsummen følger raden.</p>

          <div className="overflow-x-auto pb-2">
            <div
              className="grid min-w-[640px] gap-2"
              style={{ gridTemplateColumns: `repeat(${board.content.categories.length}, minmax(0, 1fr))` }}
            >
              {board.content.categories.map((category, columnIndex) => (
                <CategoryHeader
                  key={category.id}
                  category={category}
                  canRemove={board.content.categories.length > 1}
                  onRename={(title) => updateContent((c) => ({ ...c, categories: c.categories.map((x) => (x.id === category.id ? { ...x, title } : x)) }))}
                  onRemove={() => {
                    updateContent((c) => ({ ...c, categories: c.categories.filter((x) => x.id !== category.id) }));
                    if (category.clues.some((clue) => clue.id === selection)) setSelection(null);
                  }}
                  onMove={(direction) =>
                    updateContent((c) => {
                      const categories = [...c.categories];
                      const target = columnIndex + direction;
                      if (target < 0 || target >= categories.length) return c;
                      [categories[columnIndex], categories[target]] = [categories[target], categories[columnIndex]];
                      return { ...c, categories };
                    })
                  }
                />
              ))}
              {Array.from({ length: rows }, (_, rowIndex) =>
                board.content.categories.map((category) => {
                  const clue = category.clues[rowIndex];
                  if (!clue) return <div key={`${category.id}-${rowIndex}`} />;
                  const done = hasMedia(clue.question) && hasMedia(clue.answer);
                  const isSelected = selection === clue.id;
                  const dragging = drag?.from.categoryId === category.id && drag.from.row === rowIndex;
                  const dropTarget = isDropTarget(category.id, rowIndex);
                  const points = pointsAtRow(category.id, rowIndex);
                  return (
                    <div
                      key={clue.id}
                      ref={registerCell(category.id, rowIndex)}
                      style={cellStyle(category.id, rowIndex)}
                      className={`relative ${dragging ? "z-20 scale-[1.02] drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelection(clue.id)}
                        className={`flex min-h-20 w-full flex-col items-stretch justify-between rounded-sm p-2 pr-8 text-left transition ${
                          done ? "panel-lit" : "panel-unlit hover:text-cream-dim"
                        } ${isSelected || dragging ? "ring-2 ring-brass-light" : ""} ${dropTarget ? "ring-2 ring-dashed ring-brass" : ""}`}
                        aria-label={`${category.title}, ${points} poeng${done ? ", ferdig" : ", mangler innhold"}`}
                      >
                        <span className="numeral text-2xl">{points}</span>
                        <span className={`line-clamp-2 text-xs leading-snug ${done ? "opacity-75" : "text-cream-dim/90"}`}>
                          {clue.question.text?.trim() || (clue.question.image ? "Bilde" : "Tomt")}
                        </span>
                      </button>
                      <button
                        type="button"
                        {...handleProps(category.id, rowIndex)}
                        onKeyDown={(e) => {
                          if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
                          e.preventDefault();
                          const target = rowIndex + (e.key === "ArrowUp" ? -1 : 1);
                          if (target < 0 || target >= category.clues.length) return;
                          moveClue({ categoryId: category.id, row: rowIndex }, { categoryId: category.id, row: target });
                        }}
                        aria-label={`Flytt ${clue.points} poeng i ${category.title}`}
                        className={`absolute right-0 top-0 flex h-full w-8 cursor-grab items-center justify-center rounded-r-sm text-brass/60 transition hover:bg-white/5 hover:text-brass-light focus-visible:text-brass-light ${
                          dragging ? "cursor-grabbing text-brass-light" : ""
                        }`}
                      >
                        <Grip />
                      </button>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        </section>

        {selected && selectedCategory ? (
          <ClueEditor
            key={selected.id}
            boardId={board.id}
            editKey={key}
            categoryTitle={selectedCategory.title}
            clue={selected}
            onChange={(mutate) => updateClue(selected.id, mutate)}
            onClose={() => setSelection(null)}
          />
        ) : null}
      </main>
    </div>
  );
}

function Grip() {
  return (
    <svg viewBox="0 0 10 16" width="10" height="16" aria-hidden fill="currentColor">
      {[3, 8, 13].map((y) => (
        <g key={y}>
          <circle cx="3" cy={y} r="1.2" />
          <circle cx="7" cy={y} r="1.2" />
        </g>
      ))}
    </svg>
  );
}

function ThemePicker({ value, onChange }: { value: ThemeId; onChange: (theme: ThemeId) => void }) {
  return (
    <section className="flex flex-col gap-3" aria-label="Fargetema">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl font-medium">Fargetema</h2>
        <p className="text-sm text-cream-dim">Gjelder storskjermen, mobilen og denne siden.</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" role="radiogroup">
        {themeList.map((theme) => {
          const selected = theme.id === value;
          return (
            <button
              key={theme.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(theme.id)}
              className={`tap flex flex-col gap-2 rounded-md p-2 text-left transition ${selected ? "brass-plate" : "brass-rim bg-stage-floor/60 hover:bg-stage-floor"}`}
            >
              <span className="flex h-9 overflow-hidden rounded-sm" aria-hidden>
                {theme.swatch.map((color) => (
                  <span key={color} className="flex-1" style={{ background: color }} />
                ))}
              </span>
              <span className="text-[15px] leading-tight">{theme.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  const text: Record<SaveState, string> = {
    idle: "",
    dirty: "Ulagrede endringer",
    saving: "Lagrer…",
    saved: "Lagret",
    error: "Lagring feilet",
  };
  if (!text[state]) return null;
  return (
    <span className={`hidden text-sm sm:inline ${state === "error" ? "text-[var(--bib-red)]" : "text-cream-dim"}`} role="status">
      {text[state]}
    </span>
  );
}

function ShareLink({ boardId, editKey }: { boardId: string; editKey: string }) {
  const [copied, setCopied] = useState<"edit" | "play" | null>(null);
  const origin = useOrigin();
  const copy = async (kind: "edit" | "play") => {
    const url = kind === "edit" ? `${origin}/brett/${boardId}/rediger?key=${editKey}` : `${origin}/brett/${boardId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      window.prompt("Kopier lenken:", url);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md brass-rim bg-stage-deep/40 px-4 py-3 text-sm">
      <span className="text-cream-dim">
        Redigeringslenken er nøkkelen til brettet. Lagre den et trygt sted, den ligger bare i denne nettleseren.
      </span>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" className="min-h-10 px-3 text-sm" onClick={() => copy("edit")}>
          {copied === "edit" ? "Kopiert" : "Kopier redigeringslenke"}
        </Button>
        <Button variant="ghost" className="min-h-10 px-3 text-sm" onClick={() => copy("play")}>
          {copied === "play" ? "Kopiert" : "Kopier spillelenke"}
        </Button>
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {direction === "left" ? <path d="M10 3 5 8l5 5" /> : <path d="m6 3 5 5-5 5" />}
    </svg>
  );
}

function CategoryHeader({
  category,
  canRemove,
  onRename,
  onRemove,
  onMove,
}: {
  category: Category;
  canRemove: boolean;
  onRename: (title: string) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <div className="brass-plate flex flex-col gap-1 rounded-sm p-1.5">
      <input
        value={category.title}
        onChange={(e) => onRename(e.target.value)}
        maxLength={60}
        aria-label="Kategorinavn"
        className="w-full rounded-sm bg-transparent px-2 py-1.5 text-center font-display text-base font-semibold text-brass-ink placeholder:text-brass-ink/85 focus:bg-black/15"
        placeholder="Kategori"
      />
      <div className="flex items-center justify-between text-brass-ink">
        <button type="button" onClick={() => onMove(-1)} className="tap flex min-h-7 w-8 items-center justify-center rounded hover:bg-black/10" aria-label="Flytt til venstre">
          <Chevron direction="left" />
        </button>
        <button type="button" onClick={onRemove} disabled={!canRemove} className="tap min-h-7 rounded px-2 text-xs uppercase tracking-wider hover:bg-black/10 disabled:opacity-30">
          Slett
        </button>
        <button type="button" onClick={() => onMove(1)} className="tap flex min-h-7 w-8 items-center justify-center rounded hover:bg-black/10" aria-label="Flytt til høyre">
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  );
}

function ClueEditor({
  boardId,
  editKey,
  categoryTitle,
  clue,
  onChange,
  onClose,
}: {
  boardId: string;
  editKey: string;
  categoryTitle: string;
  clue: Clue;
  onChange: (mutate: (clue: Clue) => Clue) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [clue.id]);
  return (
    <section ref={ref} className="flex scroll-mt-4 flex-col gap-5 rounded-md brass-rim bg-stage-floor/60 p-5 md:p-6" aria-label="Rediger spørsmål">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="brass-plate rounded-sm px-3 py-1.5 font-display text-lg font-semibold">{categoryTitle}</span>
          <label className="flex items-center gap-2">
            <span className="text-sm uppercase tracking-[0.18em] text-brass">Poeng</span>
            <input
              type="number"
              value={clue.points}
              step={POINT_STEP}
              onChange={(e) => onChange((c) => ({ ...c, points: Number.parseInt(e.target.value, 10) || 0 }))}
              className="numeral w-28 rounded-md brass-rim bg-stage-deep/70 px-3 py-2 text-xl text-cream"
            />
          </label>
        </div>
        <Button variant="ghost" onClick={onClose} className="px-3">
          Lukk
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <MediaEditor
          label="Spørsmål"
          hint="Det som vises på skjermen først. Tekst, bilde eller begge."
          media={clue.question}
          boardId={boardId}
          editKey={editKey}
          onChange={(media) => onChange((c) => ({ ...c, question: media }))}
        />
        <MediaEditor
          label="Svar"
          hint="Vises når du trykker «Vis svar»."
          media={clue.answer}
          boardId={boardId}
          editKey={editKey}
          onChange={(media) => onChange((c) => ({ ...c, answer: media }))}
        />
      </div>
    </section>
  );
}

function MediaEditor({
  label,
  hint,
  media,
  boardId,
  editKey,
  onChange,
}: {
  label: string;
  hint: string;
  media: Media;
  boardId: string;
  editKey: string;
  onChange: (media: Media) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(boardId, editKey, file);
      onChange({ ...media, image: url });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Opplasting feilet.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm uppercase tracking-[0.18em] text-brass">{label}</span>
        <p className="text-sm text-cream-dim">{hint}</p>
      </div>
      <Textarea
        value={media.text ?? ""}
        onChange={(e) => onChange({ ...media, text: e.target.value || undefined })}
        placeholder={`${label}stekst`}
        maxLength={2000}
        rows={3}
      />
      <div
        className="relative flex min-h-36 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brass/40 bg-stage-deep/40 p-3 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void handleFile(e.dataTransfer.files[0]);
        }}
      >
        {media.image ? (
          <>
            <img src={media.image} alt="" className="max-h-56 rounded-sm object-contain" />
            <div className="flex gap-2">
              <Button variant="outline" className="min-h-10 px-3 text-sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
                Bytt bilde
              </Button>
              <Button variant="ghost" className="min-h-10 px-3 text-sm" onClick={() => onChange({ ...media, image: undefined })}>
                Fjern bilde
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-cream-dim">{uploading ? "Laster opp…" : "Dra et bilde hit"}</p>
            <Button variant="outline" className="min-h-10 px-3 text-sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
              Velg bilde
            </Button>
            <p className="text-xs text-cream-dim">JPG, PNG, WebP eller GIF. Bildet skaleres ned automatisk.</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => void handleFile(e.target.files?.[0])} />
      </div>
      {error ? <p className="text-sm text-[var(--bib-red)]">{error}</p> : null}
    </div>
  );
}
