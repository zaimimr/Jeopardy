"use server";

import { timingSafeEqual } from "node:crypto";
import { sanitizeContent, createEmptyContent, DEFAULT_COLUMNS, DEFAULT_ROWS, MAX_COLUMNS, MAX_ROWS } from "@/lib/board";
import { DEMO_SUBTITLE, DEMO_TITLE, demoContent } from "@/lib/demo-board";
import { publicMediaUrl, supabaseAdmin } from "@/lib/supabase/server";
import type { Board, BoardContent } from "@/lib/types";

type BoardRow = {
  id: string;
  title: string;
  subtitle: string | null;
  edit_key: string;
  content: unknown;
  created_at: string;
  updated_at: string;
};

const toBoard = (row: BoardRow): Board => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  content: sanitizeContent(row.content),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const keysMatch = (expected: string, given: string) => {
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
};

const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const loadRow = async (id: string) => {
  if (!isUuid(id)) return null;
  const { data, error } = await supabaseAdmin().from("boards").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as BoardRow | null) ?? null;
};

const requireEditable = async (id: string, key: string) => {
  const row = await loadRow(id);
  if (!row || !key || !keysMatch(row.edit_key, key)) throw new Error("Feil redigeringsnøkkel.");
  return row;
};

const cleanTitle = (value: string, fallback: string) => value.trim().slice(0, 80) || fallback;
const cleanSubtitle = (value: string | null | undefined) => {
  const trimmed = value?.trim().slice(0, 120);
  return trimmed ? trimmed : null;
};

export type CreateBoardInput = {
  title: string;
  subtitle?: string | null;
  columns?: number;
  rows?: number;
  demo?: boolean;
};

export async function createBoard(input: CreateBoardInput): Promise<{ id: string; editKey: string }> {
  const columns = Math.min(MAX_COLUMNS, Math.max(1, Math.trunc(input.columns ?? DEFAULT_COLUMNS)));
  const rows = Math.min(MAX_ROWS, Math.max(1, Math.trunc(input.rows ?? DEFAULT_ROWS)));
  const content = input.demo ? demoContent() : createEmptyContent(columns, rows);
  const { data, error } = await supabaseAdmin()
    .from("boards")
    .insert({
      title: cleanTitle(input.title, input.demo ? DEMO_TITLE : "Nytt brett"),
      subtitle: cleanSubtitle(input.subtitle ?? (input.demo ? DEMO_SUBTITLE : null)),
      content,
    })
    .select("id, edit_key")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, editKey: data.edit_key };
}

export async function getBoard(id: string): Promise<Board | null> {
  const row = await loadRow(id);
  return row ? toBoard(row) : null;
}

export async function getBoardForEdit(id: string, key: string): Promise<Board | null> {
  const row = await loadRow(id);
  if (!row || !key || !keysMatch(row.edit_key, key)) return null;
  return toBoard(row);
}

export type SaveBoardInput = {
  title: string;
  subtitle?: string | null;
  content: BoardContent;
};

export async function saveBoard(id: string, key: string, input: SaveBoardInput): Promise<Board> {
  await requireEditable(id, key);
  const { data, error } = await supabaseAdmin()
    .from("boards")
    .update({
      title: cleanTitle(input.title, "Uten navn"),
      subtitle: cleanSubtitle(input.subtitle),
      content: sanitizeContent(input.content),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return toBoard(data as BoardRow);
}

export async function duplicateBoard(id: string): Promise<{ id: string; editKey: string }> {
  const row = await loadRow(id);
  if (!row) throw new Error("Fant ikke brettet.");
  const { data, error } = await supabaseAdmin()
    .from("boards")
    .insert({ title: `${row.title} (kopi)`.slice(0, 80), subtitle: row.subtitle, content: sanitizeContent(row.content) })
    .select("id, edit_key")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, editKey: data.edit_key };
}

export async function deleteBoard(id: string, key: string): Promise<void> {
  await requireEditable(id, key);
  const { error } = await supabaseAdmin().from("boards").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function createUploadUrl(
  id: string,
  key: string,
  contentType: string,
): Promise<{ path: string; token: string; publicUrl: string }> {
  await requireEditable(id, key);
  const extension = EXTENSIONS[contentType];
  if (!extension) throw new Error("Bildeformatet støttes ikke. Bruk JPG, PNG, WebP eller GIF.");
  const path = `boards/${id}/${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabaseAdmin().storage.from("media").createSignedUploadUrl(path);
  if (error) throw new Error(error.message);
  return { path: data.path, token: data.token, publicUrl: publicMediaUrl(data.path) };
}
