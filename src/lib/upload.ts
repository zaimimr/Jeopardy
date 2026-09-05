"use client";

import { createUploadUrl } from "@/lib/actions/boards";
import { supabaseBrowser } from "@/lib/supabase/browser";

const MAX_EDGE = 1800;

const resizeImage = async (file: File): Promise<{ blob: Blob; type: string }> => {
  if (file.type === "image/gif") return { blob: file, type: file.type };
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("no canvas");
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.86));
    if (!blob) throw new Error("no blob");
    return { blob, type };
  } catch {
    return { blob: file, type: file.type };
  }
};

export async function uploadImage(boardId: string, key: string, file: File): Promise<string> {
  const supabase = supabaseBrowser();
  if (!supabase) throw new Error("Bildeopplasting er ikke konfigurert.");
  if (!file.type.startsWith("image/")) throw new Error("Velg en bildefil.");
  const { blob, type } = await resizeImage(file);
  if (blob.size > 10 * 1024 * 1024) throw new Error("Bildet er for stort (maks 10 MB).");
  const { path, token, publicUrl } = await createUploadUrl(boardId, key, type);
  const { error } = await supabase.storage.from("media").uploadToSignedUrl(path, token, blob, { contentType: type, upsert: true });
  if (error) throw new Error(error.message);
  return publicUrl;
}
