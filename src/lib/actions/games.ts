"use server";

import { createInitialState, isGameState, normalizeCode, randomCode, reduceGame } from "@/lib/game";
import { sanitizeContent } from "@/lib/board";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Board, Game, GameAction, GameState, GameWithBoard } from "@/lib/types";

type GameRow = {
  code: string;
  board_id: string;
  state: unknown;
  version: number;
};

const toGame = (row: GameRow): Game => ({
  code: row.code,
  boardId: row.board_id,
  state: isGameState(row.state) ? row.state : createInitialState(),
  version: row.version,
});

export async function createGame(boardId: string): Promise<{ code: string }> {
  const supabase = supabaseAdmin();
  const { data: board, error: boardError } = await supabase.from("boards").select("id").eq("id", boardId).maybeSingle();
  if (boardError) throw new Error(boardError.message);
  if (!board) throw new Error("Fant ikke brettet.");

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = randomCode(attempt < 5 ? 4 : 5);
    const { error } = await supabase.from("games").insert({ board_id: boardId, code, state: createInitialState() });
    if (!error) return { code };
    if (error.code !== "23505") throw new Error(error.message);
  }
  throw new Error("Klarte ikke å lage en romkode. Prøv igjen.");
}

export async function getGame(rawCode: string): Promise<GameWithBoard | null> {
  const code = normalizeCode(rawCode);
  if (code.length < 4) return null;
  const { data, error } = await supabaseAdmin()
    .from("games")
    .select("code, board_id, state, version, boards(id, title, subtitle, content, created_at, updated_at)")
    .eq("code", code)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const raw = data as unknown as GameRow & {
    boards: { id: string; title: string; subtitle: string | null; content: unknown; created_at: string; updated_at: string };
  };
  const board: Board = {
    id: raw.boards.id,
    title: raw.boards.title,
    subtitle: raw.boards.subtitle,
    content: sanitizeContent(raw.boards.content),
    createdAt: raw.boards.created_at,
    updatedAt: raw.boards.updated_at,
  };
  return { ...toGame(raw), board };
}

export async function getGameState(rawCode: string): Promise<Game | null> {
  const code = normalizeCode(rawCode);
  if (code.length < 4) return null;
  const { data, error } = await supabaseAdmin().from("games").select("code, board_id, state, version").eq("code", code).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toGame(data as GameRow) : null;
}

export async function dispatchGameAction(rawCode: string, action: GameAction): Promise<Game> {
  const code = normalizeCode(rawCode);
  const supabase = supabaseAdmin();
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const { data, error } = await supabase.from("games").select("code, board_id, state, version").eq("code", code).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Spillet finnes ikke lenger.");
    const current = toGame(data as GameRow);
    const next: GameState = reduceGame(current.state, action);
    const { data: updated, error: updateError } = await supabase
      .from("games")
      .update({ state: next, version: current.version + 1, updated_at: new Date().toISOString() })
      .eq("code", code)
      .eq("version", current.version)
      .select("code, board_id, state, version")
      .maybeSingle();
    if (updateError) throw new Error(updateError.message);
    if (updated) return toGame(updated as GameRow);
  }
  throw new Error("Mange endringer samtidig. Prøv igjen.");
}
