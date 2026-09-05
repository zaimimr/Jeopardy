"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBoard } from "@/lib/actions/boards";
import { DEFAULT_COLUMNS, DEFAULT_ROWS, MAX_COLUMNS, MAX_ROWS } from "@/lib/board";
import { rememberBoard } from "@/lib/local-boards";
import { Button, Field, Input } from "./ui";

function Stepper({ value, min, max, onChange, label }: { value: number; min: number; max: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="brass-rim flex items-center justify-between rounded-md bg-stage-deep/70 p-1" role="group" aria-label={label}>
      <button type="button" className="tap w-12 rounded text-2xl text-cream hover:bg-white/5 disabled:opacity-30" disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Færre ${label.toLowerCase()}`}>
        −
      </button>
      <span className="numeral text-2xl">{value}</span>
      <button type="button" className="tap w-12 rounded text-2xl text-cream hover:bg-white/5 disabled:opacity-30" disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Flere ${label.toLowerCase()}`}>
        +
      </button>
    </div>
  );
}

export function NewBoardForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [demo, setDemo] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { id, editKey } = await createBoard({ title, subtitle, columns, rows, demo });
      rememberBoard({ id, title: title.trim() || (demo ? "Eksempelbrett" : "Nytt brett"), key: editKey });
      router.push(`/brett/${id}/rediger?key=${editKey}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Klarte ikke å lage brettet.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Field label="Tittel">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="F.eks. Kanwals bursdagsquiz" maxLength={80} autoFocus required />
      </Field>
      <Field label="Undertittel" hint="Valgfri. Vises under tittelen på storskjermen.">
        <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="F.eks. 5. september 2026" maxLength={120} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Kategorier (kolonner)">
          <Stepper value={columns} min={1} max={MAX_COLUMNS} onChange={setColumns} label="Kategorier" />
        </Field>
        <Field label="Spørsmål per kategori (rader)">
          <Stepper value={rows} min={1} max={MAX_ROWS} onChange={setRows} label="Rader" />
        </Field>
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-md brass-rim bg-stage-deep/40 p-4">
        <input type="checkbox" checked={demo} onChange={(e) => setDemo(e.target.checked)} className="mt-1 h-5 w-5 accent-[var(--brass)]" />
        <span className="flex flex-col gap-1">
          <span className="text-[17px]">Fyll inn eksempelspørsmål</span>
          <span className="text-sm text-cream-dim">Fem kategorier med seks generelle quizspørsmål, så du ser hvordan det ser ut. Overskriver valgene over.</span>
        </span>
      </label>
      {error ? <p className="text-[var(--bib-red)]">{error}</p> : null}
      <Button type="submit" disabled={busy} className="min-h-14 text-lg">
        {busy ? "Lager brettet…" : "Lag brettet"}
      </Button>
    </form>
  );
}
