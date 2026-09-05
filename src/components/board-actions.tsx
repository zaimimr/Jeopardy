"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { duplicateBoard } from "@/lib/actions/boards";
import { createGame } from "@/lib/actions/games";
import { localBoardKey, rememberBoard } from "@/lib/local-boards";
import { Button } from "./ui";

export function BoardActions({ boardId, title }: { boardId: string; title: string }) {
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [busy, setBusy] = useState<"start" | "copy" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCanEdit(Boolean(localBoardKey(boardId)));
  }, [boardId]);

  const start = async () => {
    setBusy("start");
    setError(null);
    try {
      const { code } = await createGame(boardId);
      router.push(`/spill/${code}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Klarte ikke å starte spillet.");
      setBusy(null);
    }
  };

  const copy = async () => {
    setBusy("copy");
    setError(null);
    try {
      const { id, editKey } = await duplicateBoard(boardId);
      rememberBoard({ id, title: `${title} (kopi)`, key: editKey });
      router.push(`/brett/${id}/rediger?key=${editKey}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Klarte ikke å kopiere brettet.");
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={start} disabled={busy !== null} className="min-h-14 px-7 text-lg">
          {busy === "start" ? "Starter…" : "Start spill på storskjerm"}
        </Button>
        {canEdit ? (
          <Link href={`/brett/${boardId}/rediger`} className="tap inline-flex items-center rounded-md brass-rim bg-stage-floor/60 px-5 text-[17px] hover:bg-stage-floor">
            Rediger brettet
          </Link>
        ) : null}
        <Button variant="ghost" onClick={copy} disabled={busy !== null}>
          {busy === "copy" ? "Kopierer…" : "Lag min egen kopi"}
        </Button>
      </div>
      <p className="text-sm text-cream-dim">
        Et spill får en egen romkode. Du kan starte flere spill fra samme brett, for eksempel én runde per bord.
      </p>
      {error ? <p className="text-[var(--bib-red)]">{error}</p> : null}
    </div>
  );
}
