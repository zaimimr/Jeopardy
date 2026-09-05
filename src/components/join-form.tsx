"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGameState } from "@/lib/actions/games";
import { normalizeCode } from "@/lib/game";
import { Button } from "./ui";

export function JoinForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeCode(code);
    if (normalized.length < 4) {
      setError("Romkoden har minst fire bokstaver.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const game = await getGameState(normalized);
      if (!game) {
        setError("Fant ikke noe spill med den koden. Sjekk skjermen og prøv igjen.");
        return;
      }
      router.push(`/spill/${game.code}/fjernkontroll`);
    } catch {
      setError("Fikk ikke kontakt med tjeneren. Prøv igjen.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input
        value={code}
        onChange={(event) => setCode(normalizeCode(event.target.value))}
        autoFocus
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        maxLength={6}
        placeholder="ABCD"
        aria-label="Romkode"
        className="numeral brass-rim w-full rounded-md bg-stage-deep/70 px-4 py-4 text-center text-5xl font-bold tracking-[0.3em] text-cream placeholder:text-cream-faint"
      />
      {error ? <p className="text-[var(--bib-red)]">{error}</p> : null}
      <Button type="submit" disabled={busy || code.length < 4} className="min-h-14 text-lg">
        {busy ? "Kobler til…" : "Åpne fjernkontroll"}
      </Button>
    </form>
  );
}
