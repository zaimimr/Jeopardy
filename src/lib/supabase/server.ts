import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseServer = Boolean(url && serviceKey);

export const supabaseAdmin = () => {
  if (!url || !serviceKey) {
    throw new Error("Supabase er ikke konfigurert. Sett NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const publicMediaUrl = (path: string) => `${url}/storage/v1/object/public/media/${path}`;
